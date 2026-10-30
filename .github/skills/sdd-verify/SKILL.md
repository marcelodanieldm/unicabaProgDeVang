---
name: sdd-verify
description: Verificar implementación contra requisitos y criterios de aceptación aprobados, reportando evidencia y brechas.
---

# Verificar una capacidad

## Procedimiento

1. Lee especificación, plan, tareas y cambios de implementación.
2. Mapea cada criterio de aceptación a pruebas o evidencia concreta.
3. Ejecuta verificaciones relevantes y registra resultado, comando y limitaciones.
4. Usa MCP `validate_sdd_artifacts` sobre las rutas Markdown relacionadas para revisar
   existencia, enlaces internos e identificadores.
5. Informa criterios satisfechos, no satisfechos y sin evidencia; no cambies el estado a
   Implementada por inferencia.
6. Si la verificación requiere editar archivos o ampliar el alcance, vuelve al flujo de
   propuesta y aprobación antes de hacerlo.
