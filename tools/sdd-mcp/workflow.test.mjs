import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { SddWorkflow, resolveWorkspacePath } from "./workflow.mjs";

async function withWorkspace(run) {
  const root = await mkdtemp(path.join(os.tmpdir(), "sdd-workflow-"));
  try {
    await run(root, new SddWorkflow(root));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("proposal stays pending until an explicit decision and blocks the gate", async () => {
  await withWorkspace(async (_root, workflow) => {
    const proposal = await workflow.createProposal({
      objective: "Añadir capacidad genérica",
      scope: { included: ["documentación"], actions: ["documentar"] },
      files: ["specs/example/spec.md"],
      acceptanceCriteria: ["AC-001 verificable"],
      validation: ["Revisar el Markdown"]
    });

    assert.equal(proposal.status, "pending");
    await assert.rejects(
      workflow.checkApproval({
        proposalId: proposal.id,
        requestedFiles: ["specs/example/spec.md"],
        requestedActions: ["documentar"]
      }),
      /se requiere aprobación humana/
    );
  });
});

test("approval opens the gate only for the exact approved files and actions", async () => {
  await withWorkspace(async (_root, workflow) => {
    const proposal = await workflow.createProposal({
      objective: "Actualizar una especificación",
      scope: { included: ["spec"], actions: ["editar Markdown"] },
      files: ["specs/example/spec.md"],
      acceptanceCriteria: ["El requisito tiene criterio"],
      validation: ["Verificar enlaces"]
    });
    await workflow.recordDecision({ proposalId: proposal.id, decision: "approved" });

    const result = await workflow.checkApproval({
      proposalId: proposal.id,
      requestedFiles: ["specs/example/spec.md"],
      requestedActions: ["editar Markdown"]
    });
    assert.equal(result.approved, true);

    await assert.rejects(
      workflow.checkApproval({
        proposalId: proposal.id,
        requestedFiles: ["src/new-file.js"],
        requestedActions: ["editar Markdown"]
      }),
      /rutas fuera del alcance aprobado/
    );
    await assert.rejects(
      workflow.checkApproval({
        proposalId: proposal.id,
        requestedFiles: ["specs/example/spec.md"],
        requestedActions: ["implementar código"]
      }),
      /acciones fuera del alcance aprobado/
    );
  });
});

test("changes requested requires feedback and does not open the gate", async () => {
  await withWorkspace(async (_root, workflow) => {
    const proposal = await workflow.createProposal({
      objective: "Cambio",
      scope: { included: ["docs"], actions: ["editar"] },
      files: ["README.md"],
      acceptanceCriteria: ["Criterio"],
      validation: ["Validación"]
    });
    await assert.rejects(
      workflow.recordDecision({
        proposalId: proposal.id,
        decision: "changes_requested"
      }),
      /Incluye el feedback humano/
    );

    const result = await workflow.recordDecision({
      proposalId: proposal.id,
      decision: "changes_requested",
      feedback: "Reducir alcance"
    });
    assert.equal(result.status, "changes_requested");
  });
});

test("workspace paths reject absolute paths, traversal, and symlinks escaping the root", async () => {
  await withWorkspace(async (root, workflow) => {
    assert.throws(() => resolveWorkspacePath(root, "../outside.md"), /permanecer dentro/);
    assert.throws(() => resolveWorkspacePath(root, "C:\\outside.md"), /permanecer dentro/);

    const outside = await mkdtemp(path.join(os.tmpdir(), "sdd-outside-"));
    try {
      await writeFile(path.join(outside, "secret.md"), "# Outside\n");
      const linkPath = path.join(root, "external-link");
      await symlink(outside, linkPath, "junction");
      await assert.rejects(
        workflow.validateArtifacts({ files: ["external-link/secret.md"] }),
        /fuera del workspace/
      );
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });
});

test("artifact validation reports broken links and repeated IDs", async () => {
  await withWorkspace(async (root, workflow) => {
    const spec = path.join(root, "spec.md");
    const plan = path.join(root, "plan.md");
    const tasks = path.join(root, "tasks.md");
    await mkdir(path.dirname(spec), { recursive: true });
    await writeFile(spec, "# Spec\n\n- **FR-001:** A testable requirement.\n\n[missing](./absent.md)\n");
    await writeFile(plan, "# Plan\n\nReferences FR-001.\n");
    await writeFile(tasks, "# Tasks\n\nReferences FR-001.\n");

    const result = await workflow.validateArtifacts({
      files: ["spec.md", "plan.md", "tasks.md"]
    });
    assert.equal(result.valid, false);
    assert.equal(result.findings.length, 1);
    assert.equal(result.findings[0].message, "Enlace interno inexistente: ./absent.md");
    assert.deepEqual(result.duplicateIdentifiers, []);
    assert.deepEqual(result.unreferencedRequirements, []);

    await writeFile(plan, "# Plan\n");
    await writeFile(tasks, "# Tasks\n");
    const unreferenced = await workflow.validateArtifacts({
      files: ["spec.md", "plan.md", "tasks.md"]
    });
    assert.deepEqual(unreferenced.unreferencedRequirements, ["FR-001"]);

    await writeFile(tasks, "# Tasks\n\n- **FR-001:** Duplicate declaration.\n");
    const duplicated = await workflow.validateArtifacts({
      files: ["spec.md", "plan.md", "tasks.md"]
    });
    assert.equal(duplicated.valid, false);
    assert.deepEqual(duplicated.duplicateIdentifiers, [{
      id: "FR-001",
      references: ["spec.md", "tasks.md"]
    }]);
    assert.equal(
      duplicated.findings.at(-1).message,
      "Identificador declarado más de una vez: FR-001"
    );
  });
});
