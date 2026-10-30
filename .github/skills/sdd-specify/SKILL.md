---
name: sdd-specify
description: Crear o refinar especificaciones independientes del dominio, con requisitos comprobables y criterios de aceptación trazables.
---

# Especificar una capacidad

## Procedimiento

1. Lee las fuentes de contexto relevantes y determina qué está confirmado, propuesto o
   pendiente.
2. Redacta la propuesta de especificación sin editar archivos y solicita aprobación humana
   mediante el flujo `sdd-propose-change`.
3. Tras la aprobación y la comprobación MCP, documenta problema, objetivos, exclusiones,
   personas, requisitos funcionales y no funcionales, reglas, criterios de aceptación,
   casos límite, dependencias y trazabilidad.
4. Usa el formato existente del repositorio si lo hay; de lo contrario, crea una estructura
   genérica que no imponga un dominio ni tecnología.
5. Separa requisitos de implementación. Marca las decisiones no resueltas como pendientes.
6. Verifica que los criterios sean observables y que cada requisito tenga vínculo a su
   fuente y a una forma de validación.

No implementes comportamiento durante este skill. Si el refinamiento cambia un alcance
aprobado, presenta una propuesta nueva.
