# Registro de decisiones

Este directorio registra decisiones relevantes de arquitectura y producto para evitar que
las alternativas preliminares se interpreten como acuerdos. Cada decisión debe tener
responsable, fecha, estado, contexto, alternativas y consecuencias.

## Estados

- **Propuesta:** en discusión; no implementar como decisión aprobada.
- **Aceptada:** acuerdo vigente que guía los planes.
- **Rechazada:** alternativa considerada, conservada como antecedente.
- **Reemplazada:** decisión que dejó de estar vigente; enlazar la decisión sucesora.

## Decisiones

| ID | Tema | Estado | Registro |
|---|---|---|---|
| ADR-0001 | Arquitectura y stack propuestos | Propuesta | [ADR-0001](./ADR-0001-stack-propuesto.md) |

## Cómo agregar una decisión

1. Copiar [`template.md`](./template.md) a `ADR-NNNN-titulo-breve.md`.
2. Describir el contexto y las opciones reales, incluyendo la opción de no decidir todavía.
3. Registrar impactos en especificaciones y planes.
4. No marcarla como aceptada hasta que el grupo confirme el acuerdo.
5. Si se reemplaza una decisión, conservar el registro anterior y enlazar su sucesora.
