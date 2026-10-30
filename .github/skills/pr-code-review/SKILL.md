---
name: pr-code-review
description: Revisar una Pull Request de GitHub con evidencia (archivo y línea), clasificar hallazgos por severidad e informar sin modificar la PR. Usar cuando se pida revisar, auditar o dar feedback de una PR.
---

# Code review de una Pull Request

Skill de solo lectura: no edites código ni la PR, y no publiques reseñas, comentarios,
aprobaciones ni rechazos en GitHub sin confirmación humana explícita.

## Procedimiento

1. **Identificar la PR.** Obtén `owner`, `repo` y número. Si falta alguno, pregúntalo.
2. **Reunir contexto** con las herramientas de GitHub:
   - Metadatos y descripción (`pull_request_read` `get`): objetivo, base, estado, draft.
   - Archivos cambiados (`get_files`) y diff (`get_diff`); pagina si es grande.
   - Commits (`get_commits`), checks (`get_check_runs`/`get_status`).
   - Comentarios y reseñas previas (`get_comments`, `get_reviews`, `get_review_comments`)
     para no repetir observaciones ya resueltas.
   - Issue vinculada y, si el repositorio usa SDD, la especificación, plan y tareas
     relacionados.
3. **Revisar el diff** archivo por archivo, leyendo el código circundante cuando el diff
   no basta. Evalúa:
   - **Corrección:** bugs, casos borde, manejo de errores, concurrencia, regresiones.
   - **Seguridad:** validación de entradas, autorización, secretos, inyección, datos sensibles.
   - **Alcance:** que la PR cumpla su objetivo y criterios de aceptación, sin cambios no
     relacionados.
   - **Pruebas:** cobertura de los cambios y de los casos borde; checks en rojo.
   - **Diseño y mantenibilidad:** acoplamiento, duplicación, nombres, compatibilidad hacia atrás.
   - **Rendimiento y documentación** cuando aplique.
4. **Filtrar.** Reporta solo hallazgos con evidencia concreta. Omite preferencias de estilo
   que un linter cubra y no presentes suposiciones como hechos; si dudas, formula una pregunta.
5. **Clasificar** cada hallazgo:
   - 🔴 **Bloqueante:** bug, vulnerabilidad o incumplimiento de un requisito; debe corregirse.
   - 🟠 **Importante:** riesgo real o prueba faltante; conviene corregirlo antes de fusionar.
   - 🟡 **Sugerencia:** mejora de diseño o legibilidad.
   - ⚪ **Pregunta/nota:** duda o aclaración.
6. **Informar** con el formato siguiente.
7. **Ofrecer acciones** (usa `ask_user` si está disponible): publicar la reseña en GitHub,
   corregir los hallazgos o no hacer nada. Actúa solo si el humano lo confirma; si implica
   editar archivos, aplica el flujo de propuesta y aprobación SDD.

## Formato del informe

```
## Resumen
Objetivo de la PR, veredicto sugerido (aprobar / cambios requeridos / comentar) y estado de checks.

## Hallazgos
| # | Severidad | Archivo | Líneas | Hallazgo | Sugerencia |
|---|-----------|---------|--------|----------|------------|

## Cobertura de requisitos
Criterio de aceptación -> evidencia en la PR (cumple / no cumple / sin evidencia).

## Limitaciones
Qué no se pudo verificar (código no ejecutado, diff truncado, contexto faltante).
```

Si no hay hallazgos, indícalo explícitamente y enumera qué se revisó.
