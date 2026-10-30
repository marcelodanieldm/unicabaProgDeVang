# Especificaciones del proyecto

Este directorio contiene los requisitos funcionales verificables del Sistema Inteligente
de Gestión de Inventario y Predicción de Quiebres de Stock. Las especificaciones se
mantienen separadas de los planes técnicos y de las tareas para conservar trazabilidad
entre lo que se necesita, cómo se implementará y el trabajo realizado.

## Estructura

```text
.specify/
  memory/
    constitution.md
  workflow/
    README.md
  templates/
    spec-template.md
    plan-template.md
    tasks-template.md
.github/
  copilot-instructions.md
  skills/
    sdd-propose-change/SKILL.md
    sdd-specify/SKILL.md
    sdd-plan/SKILL.md
    sdd-implement/SKILL.md
    sdd-verify/SKILL.md
.vscode/
  mcp.json
tools/
  sdd-mcp/
    server.mjs
    workflow.mjs
    workflow.test.mjs
specs/
  README.md
  001-inventory-and-stock-prediction/
    spec.md
    plan.md
    tasks.md
  002-access-control/
    spec.md
    plan.md
    tasks.md
  003-inventory-and-sales/
    spec.md
    plan.md
    tasks.md
  004-predictive-monitor/
    spec.md
    plan.md
    tasks.md
  decisions/
    README.md
    template.md
```

## Documentos iniciales

| Documento | Propósito |
|---|---|
| [Constitución](../.specify/memory/constitution.md) | Principios y flujo obligatorio de desarrollo. |
| [Especificación del MVP](./001-inventory-and-stock-prediction/spec.md) | Alcance funcional inicial, requisitos y aceptación. |
| [Plan del MVP](./001-inventory-and-stock-prediction/plan.md) | Diseño preliminar, contratos y decisiones por resolver. |
| [Tareas del MVP](./001-inventory-and-stock-prediction/tasks.md) | Desglose de trabajo con vínculos a los requisitos. |
| [Control de acceso](./002-access-control/spec.md) | Especificación detallada de autenticación y permisos por rol. |
| [Inventario y ventas](./003-inventory-and-sales/spec.md) | Especificación de catálogo, movimientos y registro transaccional de ventas. |
| [Monitor predictivo](./004-predictive-monitor/spec.md) | Especificación de analítica, alertas y visualización de proyecciones. |
| [Registro de decisiones](./decisions/README.md) | Decisiones técnicas y de producto con estado y justificación. |
| [Flujo HITL para SDD](../.specify/workflow/README.md) | Ciclo con propuesta, aprobación explícita, gate de cambios y validación. |
| [Skills de SDD](../.github/skills/sdd-propose-change/SKILL.md) | Skills reutilizables para proponer, especificar, planificar, implementar y verificar. |
| [Servidor MCP local](../tools/sdd-mcp/server.mjs) | Herramientas para registrar aprobaciones y validar artefactos SDD. |

La especificación `001` funciona como épica y fuente de requisitos generales. Las
especificaciones `002` a `004` detallan capacidades para refinarlas, implementarlas y
verificarlas de manera independiente. No deben contradecir la épica: si cambia un requisito
general, actualizar primero `001` y luego sus capacidades relacionadas.

## Flujo de trabajo SDD

Para cada nueva capacidad:

1. Crear un directorio con identificador secuencial y nombre breve en kebab-case,
   por ejemplo `002-user-management`.
2. Copiar las plantillas de `.specify/templates/` como `spec.md`, `plan.md` y `tasks.md`.
3. Escribir primero el problema, los roles, los requisitos verificables y los criterios de
   aceptación en `spec.md`.
4. Revisar los criterios contra la consigna, la rúbrica y la constitución. Marcar
   explícitamente lo que requiera decisión del grupo o aprobación docente.
5. Completar `plan.md` con componentes, contratos, pruebas y migraciones. No fijar una
   tecnología o regla que aún esté pendiente sin registrar la decisión.
6. Desglosar `tasks.md` en tareas pequeñas y vinculadas a IDs de requisitos y criterios.
7. Implementar y verificar cada tarea. Si se modifica el comportamiento esperado, revisar
   y aprobar primero la especificación.
8. Al cerrar la capacidad, actualizar su estado y asegurar trazabilidad entre criterios,
   pruebas y tareas.

## Convenciones

- Escribir documentación y criterios en español.
- Identificar requisitos funcionales como `FR-###`, no funcionales como `NFR-###`, reglas
  de negocio como `BR-###`, criterios de aceptación como `AC-###` y tareas como `T-###`.
- Mantener los identificadores de requisitos generales en `001`; las especificaciones de
  capacidades referencian esos IDs y asignan IDs nuevos únicamente a sus criterios y
  tareas.
- Mantener IDs estables; no reutilizar IDs retirados.
- Los requisitos deben expresar un comportamiento comprobable; evitar mezclar decisiones
  de implementación en requisitos de usuario.
- Usar estados `Borrador`, `En revisión`, `Aprobada` e `Implementada`.
- No considerar una propuesta preliminar del README como una decisión técnica aprobada.
- Mantener la relación con la fuente: `CONSIGNA-TP.md` para obligaciones académicas y
  `README.md` para la propuesta del grupo.

## Fuente de contexto

- [Consigna del trabajo práctico](../CONSIGNA-TP.md)
- [Propuesta del proyecto](../README.md)
