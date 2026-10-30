---
name: sdd-implement
description: Implementar únicamente una especificación y un plan aprobados, con autorización humana y verificación antes de editar.
---

# Implementar desde una especificación

## Precondiciones obligatorias

- Existe una especificación vigente y aprobada con criterios de aceptación.
- El plan identifica componentes, decisiones resueltas y pruebas.
- El humano aprobó una propuesta específica para esta implementación.
- MCP `record_human_decision` registra aprobación y `check_implementation_approval`
  confirma las rutas y acciones concretas.

Si falta una precondición, no edites. Inicia o completa el flujo de propuesta y aprobación.

## Procedimiento

1. Relaciona cada tarea con requisitos y criterios existentes.
2. Comprueba el gate inmediatamente antes de editar. No solicites ni aceptes permisos más
   amplios que el alcance aprobado.
3. Implementa de forma incremental, siguiendo patrones existentes y sin introducir
   decisiones no aprobadas.
4. Si necesitas cambiar alcance, archivos, decisiones o comportamiento esperado, pausa,
   informa el motivo y solicita aprobación de una propuesta revisada.
5. Ejecuta las pruebas apropiadas y actualiza especificación, plan o tareas solo si esos
   cambios también están dentro del alcance aprobado.
6. Informa los archivos modificados, criterios cubiertos, comandos y resultados, más
   cualquier limitación pendiente.
