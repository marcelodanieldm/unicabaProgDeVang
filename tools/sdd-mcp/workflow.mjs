import { randomUUID } from "node:crypto";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

const MARKDOWN_LINK = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g;
const DECLARATION_PATTERNS = [
  /(?:^|\n)\s*[-*]\s+\*\*((?:REQ|FR|NFR|BR|AC|US)-\d{3,}):?\*\*:?/g,
  /(?:^|\n)###\s+(AC-\d{3,})(?:\s|—|$)/g,
  /(?:^|\n)\s*[-*]\s+\[[ xX]\]\s+\*\*(T-\d{3,})\*\*/g
];

export function resolveWorkspacePath(workspaceRoot, relativePath) {
  if (typeof relativePath !== "string" || relativePath.trim() === "") {
    throw new Error("La ruta debe ser relativa al workspace y no puede estar vacía.");
  }

  const normalized = relativePath.replaceAll("\\", "/");
  if (path.posix.isAbsolute(normalized) || normalized.split("/").includes("..")) {
    throw new Error(`La ruta debe permanecer dentro del workspace: ${relativePath}`);
  }

  const root = path.resolve(workspaceRoot);
  const resolved = path.resolve(root, normalized);
  const relative = path.relative(root, resolved);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`La ruta debe permanecer dentro del workspace: ${relativePath}`);
  }

  return resolved;
}

async function assertExistingPathInsideRoot(root, filePath) {
  const actual = await realpath(filePath);
  const actualRelative = path.relative(root, actual);
  if (
    actualRelative === ".." ||
    actualRelative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(actualRelative)
  ) {
    throw new Error(`La ruta resuelve fuera del workspace: ${filePath}`);
  }
  return actual;
}

export class SddWorkflow {
  constructor(workspaceRoot, stateFile = ".specify/workflow/change-approvals.json") {
    this.workspaceRoot = path.resolve(workspaceRoot);
    this.statePath = resolveWorkspacePath(this.workspaceRoot, stateFile);
  }

  async readState() {
    try {
      const contents = await readFile(this.statePath, "utf8");
      const parsed = JSON.parse(contents);
      if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.proposals)) {
        throw new Error("El registro de propuestas tiene un formato inválido.");
      }
      return parsed;
    } catch (error) {
      if (error.code === "ENOENT") {
        return { version: 1, proposals: [] };
      }
      throw error;
    }
  }

  async writeState(state) {
    await mkdir(path.dirname(this.statePath), { recursive: true });
    await writeFile(this.statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  }

  async createProposal(input) {
    const requiredFields = ["objective", "scope", "files", "acceptanceCriteria", "validation"];
    for (const field of requiredFields) {
      if (input[field] === undefined || input[field] === null || input[field] === "") {
        throw new Error(`Falta el campo obligatorio "${field}".`);
      }
    }
    if (!Array.isArray(input.files) || input.files.length === 0) {
      throw new Error("La propuesta debe enumerar al menos una ruta relativa exacta.");
    }
    const files = [...new Set(input.files.map((file) => {
      resolveWorkspacePath(this.workspaceRoot, file);
      return file.replaceAll("\\", "/");
    }))];
    if (files.some((file) => file.includes("*"))) {
      throw new Error("No se permiten comodines: enumera las rutas concretas.");
    }

    const state = await this.readState();
    const proposal = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
      objective: input.objective,
      scope: input.scope,
      files,
      acceptanceCriteria: input.acceptanceCriteria,
      validation: input.validation,
      risks: input.risks ?? [],
      outOfScope: input.outOfScope ?? [],
      decision: null
    };
    state.proposals.push(proposal);
    await this.writeState(state);
    return proposal;
  }

  async recordDecision({ proposalId, decision, feedback = "" }) {
    if (!["approved", "changes_requested", "rejected"].includes(decision)) {
      throw new Error("La decisión debe ser approved, changes_requested o rejected.");
    }
    if (decision === "changes_requested" && feedback.trim() === "") {
      throw new Error("Incluye el feedback humano cuando se soliciten cambios.");
    }
    const state = await this.readState();
    const proposal = state.proposals.find((item) => item.id === proposalId);
    if (!proposal) {
      throw new Error(`No existe la propuesta ${proposalId}.`);
    }
    if (proposal.status !== "pending") {
      throw new Error(`La propuesta ya tiene estado "${proposal.status}" y no puede decidirse nuevamente.`);
    }
    proposal.status = decision;
    proposal.decision = {
      value: decision,
      feedback,
      recordedAt: new Date().toISOString()
    };
    await this.writeState(state);
    return proposal;
  }

  async checkApproval({ proposalId, requestedFiles, requestedActions }) {
    if (!Array.isArray(requestedFiles) || requestedFiles.length === 0) {
      throw new Error("Enumera las rutas exactas que se pretende modificar.");
    }
    if (!Array.isArray(requestedActions) || requestedActions.length === 0) {
      throw new Error("Enumera las acciones exactas antes de comprobar la aprobación.");
    }

    const state = await this.readState();
    const proposal = state.proposals.find((item) => item.id === proposalId);
    if (!proposal) {
      throw new Error(`No existe la propuesta ${proposalId}.`);
    }
    if (proposal.status !== "approved") {
      throw new Error(`Gate cerrado: propuesta en estado "${proposal.status}", se requiere aprobación humana.`);
    }

    const approvedFiles = new Set(proposal.files);
    const normalizedRequestedFiles = [...new Set(requestedFiles.map((file) => {
      resolveWorkspacePath(this.workspaceRoot, file);
      return file.replaceAll("\\", "/");
    }))];
    const unapprovedFiles = normalizedRequestedFiles.filter((file) => !approvedFiles.has(file));
    if (unapprovedFiles.length > 0) {
      throw new Error(`Gate cerrado: rutas fuera del alcance aprobado: ${unapprovedFiles.join(", ")}`);
    }

    const approvedActions = new Set(proposal.scope.actions ?? []);
    const unapprovedActions = requestedActions.filter((action) => !approvedActions.has(action));
    if (unapprovedActions.length > 0) {
      throw new Error(`Gate cerrado: acciones fuera del alcance aprobado: ${unapprovedActions.join(", ")}`);
    }

    for (const file of normalizedRequestedFiles) {
      const absolute = resolveWorkspacePath(this.workspaceRoot, file);
      try {
        await assertExistingPathInsideRoot(this.workspaceRoot, absolute);
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    }

    return {
      approved: true,
      proposalId,
      files: normalizedRequestedFiles,
      actions: requestedActions
    };
  }

  async validateArtifacts({ files }) {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error("Indica al menos una ruta Markdown para validar.");
    }

    const root = await realpath(this.workspaceRoot);
    const loaded = new Map();
    for (const relativePath of [...new Set(files)]) {
      const absolute = resolveWorkspacePath(root, relativePath);
      if (path.extname(absolute).toLowerCase() !== ".md") {
        throw new Error(`El artefacto no es Markdown: ${relativePath}`);
      }
      const safePath = await assertExistingPathInsideRoot(root, absolute);
      loaded.set(safePath, {
        relativePath: path.relative(root, safePath),
        content: await readFile(safePath, "utf8")
      });
    }

    const findings = [];
    const declarations = new Map();
    for (const [absolute, artifact] of loaded) {
      for (const pattern of DECLARATION_PATTERNS) {
        for (const match of artifact.content.matchAll(pattern)) {
          const id = match[1];
          const references = declarations.get(id) ?? [];
          references.push(artifact.relativePath);
          declarations.set(id, references);
        }
      }

      for (const match of artifact.content.matchAll(MARKDOWN_LINK)) {
        const target = match[1];
        if (/^(?:[a-z][a-z0-9+.-]*:|#|mailto:)/i.test(target)) {
          continue;
        }
        const cleanTarget = decodeURIComponent(target.split("#", 1)[0].split("?", 1)[0]);
        if (cleanTarget === "") {
          continue;
        }
        const targetPath = path.resolve(path.dirname(absolute), cleanTarget);
        const relative = path.relative(root, targetPath);
        if (
          relative === ".." ||
          relative.startsWith(`..${path.sep}`) ||
          path.isAbsolute(relative)
        ) {
          findings.push({
            severity: "error",
            file: artifact.relativePath,
            message: `Enlace fuera del workspace: ${target}`
          });
          continue;
        }
        try {
          await assertExistingPathInsideRoot(root, targetPath);
        } catch (error) {
          if (error.code === "ENOENT") {
            findings.push({
              severity: "error",
              file: artifact.relativePath,
              message: `Enlace interno inexistente: ${target}`
            });
          } else {
            throw error;
          }
        }
      }
    }

    const duplicateIds = [...declarations.entries()]
      .filter(([, references]) => references.length > 1)
      .map(([id, references]) => ({ id, references }));
    for (const duplicate of duplicateIds) {
      findings.push({
        severity: "error",
        file: duplicate.references.join(", "),
        message: `Identificador declarado más de una vez: ${duplicate.id}`
      });
    }
    const requirementIds = [...declarations.keys()].filter((id) =>
      /^(?:REQ|FR|NFR|BR|US)-/.test(id)
    );
    const unreferencedRequirements = requirementIds.filter((id) => {
      const declaringFiles = new Set(declarations.get(id));
      return ![...loaded.values()].some(
        (artifact) => !declaringFiles.has(artifact.relativePath) &&
          new RegExp(`\\b${id}\\b`).test(artifact.content)
      );
    });

    return {
      valid: findings.length === 0,
      artifacts: [...loaded.values()].map(({ relativePath }) => relativePath),
      identifiers: [...declarations.keys()],
      duplicateIdentifiers: duplicateIds,
      unreferencedRequirements,
      findings
    };
  }
}
