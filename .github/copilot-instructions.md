# Instrucciones de trabajo SDD

Estas reglas se aplican a cualquier tipo de proyecto y cambio, no solo al dominio de
inventario. Las especificaciones, los planes y las pruebas del repositorio aportan contexto;
si una decisión abierta afecta el cambio, no la resuelvas por suposición.

## Human in the loop obligatorio

1. Puedes inspeccionar el repositorio y reunir contexto antes de proponer.
2. Antes de editar archivos, presenta al humano una propuesta concreta: objetivo, alcance,
   archivos o componentes previstos, criterios de aceptación, validaciones, riesgos y lo
   que quedará fuera.
3. Registra la propuesta con la herramienta MCP `create_change_proposal` y solicita
   aprobación explícita en la conversación. Una petición original para “implementar” no
   aprueba por adelantado un plan detallado posterior.
4. Espera la respuesta. No edites código, especificaciones, planes, tareas ni configuración
   antes de la aprobación. Si el humano modifica el alcance, actualiza la propuesta y vuelve
   a solicitar aprobación.
5. Si se rechaza, detente. Si se aprueba, registra la decisión con `record_human_decision`
   y comprueba los archivos y acciones exactos mediante `check_implementation_approval`
   antes de editar.
6. Si durante el trabajo cambia el alcance, aparece una decisión material no aprobada o se
   requiere modificar archivos fuera del permiso registrado, detente y presenta una nueva
   propuesta. La aprobación anterior no se extiende automáticamente.
7. Tras implementar, ejecuta las verificaciones apropiadas y utiliza
   `validate_sdd_artifacts` para comprobar los enlaces y la trazabilidad documental cuando
   corresponda. Informa resultados y limitaciones; no marques criterios como satisfechos
   sin evidencia.

## Reglas SDD

- Distingue requisitos, diseño técnico, tareas y decisiones.
- Conserva trazabilidad entre necesidad, criterios de aceptación, tareas y pruebas.
- No conviertas una alternativa o supuesto en decisión aceptada sin confirmación humana.
- Mantén la documentación del proyecto y las skills reutilizables para cualquier dominio.
- El MCP registra el flujo y comprueba el alcance aprobado; no reemplaza el juicio humano
  ni otorga permisos generales de edición al servidor.
