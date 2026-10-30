# Flujo SDD con Human in the Loop

El flujo es independiente del dominio del proyecto. Las skills para agentes compatibles
con Copilot están en `.github/skills/` y la configuración MCP de VS Code está en
`.vscode/mcp.json`.

## Ciclo de cambio

```text
Inspeccionar contexto (solo lectura)
  -> Preparar propuesta concreta
  -> create_change_proposal
  -> Presentar propuesta al humano y esperar
       -> cambios solicitados: revisar propuesta y volver a presentar
       -> rechazo: registrar y detenerse
       -> aprobación: registrar decisión explícita
  -> check_implementation_approval (rutas y acciones exactas)
  -> Especificar / planificar / implementar
  -> Probar y validar trazabilidad
  -> Informar evidencia y brechas
```

La aprobación del trabajo en términos generales no reemplaza la aprobación del plan
concreto. Si se agregan rutas, acciones, riesgos o decisiones materiales fuera de lo
aprobado, se detiene el trabajo y se solicita una nueva aprobación.

## Herramientas MCP

El servidor local `sdd-workflow` ofrece herramientas acotadas:

- `create_change_proposal`: guarda un borrador de propuesta con identificador.
- `record_human_decision`: registra aprobación, cambios solicitados o rechazo y su motivo.
- `check_implementation_approval`: exige aprobación vigente y limita las rutas/acciones al
  alcance aprobado.
- `validate_sdd_artifacts`: revisa Markdown, enlaces internos e identificadores referidos
  en un conjunto de artefactos SDD, y señala requisitos sin referencia cruzada.

El servidor no edita código ni especificaciones y no ofrece herramientas generales de
filesystem o Git. El registro local de aprobaciones vive en
`.specify/workflow/change-approvals.json` y está ignorado por Git; no debe contener
credenciales ni información sensible.

El gate es una comprobación cooperativa para el agente: no intercepta editores, terminales
ni otros MCPs. Las instrucciones y skills exigen llamar al gate antes de editar. La
aprobación siempre debe venir de una respuesta explícita del humano en la conversación; no
se debe registrar como aprobación una inferencia del agente.

## Configuración y pruebas

1. Instala Node.js 20 o superior.
2. Instala dependencias dentro de `tools/sdd-mcp` con `npm install`.
3. Abre o recarga el workspace en VS Code y habilita el servidor `sdd-workflow` desde la
   vista de MCP.
4. Comprueba el servidor con `npm test` en `tools/sdd-mcp`.
5. Sigue `.github/copilot-instructions.md` y activa la skill adecuada para el trabajo.

La configuración del workspace arranca el servidor desde su ruta local. No requiere
credenciales ni conexión a un servicio remoto.
