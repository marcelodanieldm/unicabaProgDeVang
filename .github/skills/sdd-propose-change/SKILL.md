---
name: sdd-propose-change
description: Proponer y obtener aprobación humana explícita para un cambio antes de editar código o documentación. Usar al iniciar cualquier cambio de alcance material.
---

# Proponer un cambio con aprobación humana

Este skill es agnóstico al dominio y al stack.

## Procedimiento

1. Inspecciona el contexto necesario sin modificar archivos.
2. Prepara una propuesta que incluya:
   - objetivo y problema;
   - alcance incluido y excluido;
   - rutas de archivos que se prevé crear o modificar;
   - requisitos o criterios afectados;
   - plan de verificación;
   - riesgos, supuestos y decisiones pendientes.
3. Registra la propuesta con MCP `create_change_proposal`.
4. Presenta en la conversación la propuesta y su identificador. Solicita aprobación
   explícita o modificaciones usando la interacción disponible con el usuario.
5. No escribas archivos ni hagas cambios laterales antes de la respuesta humana.
6. Si se piden cambios, crea una propuesta revisada y vuelve al paso 3. No interpretes
   silencio, ambigüedad o una petición general como aprobación.
7. Si se rechaza, registra `rejected` con MCP `record_human_decision` y detente.
8. Si se aprueba, registra `approved` con MCP `record_human_decision`; llama a
   `check_implementation_approval` para los archivos y acciones exactos antes de editar.

## Respuesta esperada

Un resumen claro y breve del cambio propuesto, qué no se hará y cómo se verificará. Una
aprobación solo cubre la propuesta registrada; cualquier expansión requiere nueva aprobación.
