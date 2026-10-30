import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { SddWorkflow } from "./workflow.mjs";

const workspaceRoot = process.env.SDD_WORKSPACE_ROOT ?? process.cwd();
const workflow = new SddWorkflow(workspaceRoot);
const server = new McpServer({
  name: "sdd-workflow",
  version: "0.1.0"
});

function success(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

function failure(error) {
  return {
    isError: true,
    content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }]
  };
}

server.registerTool(
  "create_change_proposal",
  {
    title: "Crear propuesta de cambio",
    description: "Registra una propuesta SDD pendiente de aprobación humana. No modifica código ni especificaciones.",
    inputSchema: {
      objective: z.string().min(1),
      scope: z.object({
        included: z.array(z.string()).min(1),
        actions: z.array(z.string()).min(1)
      }),
      files: z.array(z.string()).min(1).describe("Rutas relativas exactas; no se permiten comodines."),
      acceptanceCriteria: z.array(z.string()).min(1),
      validation: z.array(z.string()).min(1),
      risks: z.array(z.string()).default([]),
      outOfScope: z.array(z.string()).default([])
    }
  },
  async (input) => {
    try {
      return success(await workflow.createProposal(input));
    } catch (error) {
      return failure(error);
    }
  }
);

server.registerTool(
  "record_human_decision",
  {
    title: "Registrar decisión humana",
    description: "Registra la respuesta explícita del humano a una propuesta pendiente.",
    inputSchema: {
      proposalId: z.string().uuid(),
      decision: z.enum(["approved", "changes_requested", "rejected"]),
      feedback: z.string().default("")
    }
  },
  async (input) => {
    try {
      return success(await workflow.recordDecision(input));
    } catch (error) {
      return failure(error);
    }
  }
);

server.registerTool(
  "check_implementation_approval",
  {
    title: "Comprobar gate de implementación",
    description: "Permite continuar solo si existe aprobación humana vigente para las rutas y acciones exactas.",
    inputSchema: {
      proposalId: z.string().uuid(),
      requestedFiles: z.array(z.string()).min(1),
      requestedActions: z.array(z.string()).min(1)
    }
  },
  async (input) => {
    try {
      return success(await workflow.checkApproval(input));
    } catch (error) {
      return failure(error);
    }
  }
);

server.registerTool(
  "validate_sdd_artifacts",
  {
    title: "Validar artefactos SDD",
    description: "Valida que un conjunto de documentos Markdown exista dentro del workspace, que sus enlaces sean válidos y reporta identificadores repetidos.",
    inputSchema: {
      files: z.array(z.string()).min(1)
    }
  },
  async (input) => {
    try {
      return success(await workflow.validateArtifacts(input));
    } catch (error) {
      return failure(error);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
