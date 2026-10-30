# ADR-0001: Arquitectura y stack propuestos

- **Estado:** Propuesta
- **Fecha:** 2026-10-29
- **Responsable:** Grupo 7
- **Especificaciones afectadas:** [MVP](../001-inventory-and-stock-prediction/plan.md), [inventario y ventas](../003-inventory-and-sales/plan.md), [monitor predictivo](../004-predictive-monitor/plan.md)

## Contexto

La consigna requiere una interfaz, un microservicio Java, un microservicio Python y una base
de datos. La propuesta del grupo describe tecnologías para cada componente, pero aún deja
alternativas abiertas y no confirma versiones o contratos.

## Opciones consideradas

1. **Mantener la propuesta inicial:** Java con Spring Boot, Python con FastAPI, PostgreSQL,
   HTTP/REST y JSON; Tailwind CSS y Chart.js o Recharts para la interfaz.
2. **Elegir alternativas distintas:** permitido por la consigna si se fundamentan y se
   documentan.
3. **Posponer la elección final:** avanzar con requisitos y contratos neutrales a la
   implementación hasta que el grupo acuerde el stack.

## Decisión

La arquitectura y las tecnologías enumeradas en la propuesta se conservan como **base
propuesta**, no como decisión aprobada. El grupo debe confirmar el stack, las versiones,
la biblioteca de gráficos y la estrategia de comunicación antes de cerrar los planes de
implementación.

## Consecuencias

- Los requisitos deben permanecer independientes de frameworks y versiones.
- Los planes pueden describir la arquitectura propuesta, identificándola como pendiente.
- No crear dependencias, scaffolding ni contratos irreversibles basados únicamente en esta
  propuesta.
- Una decisión aceptada debe actualizar este registro, los planes afectados y la
  documentación técnica.

## Confirmación

Pendiente de confirmación por el grupo.

## Historial

- 2026-10-29: registro inicial como propuesta basada en `README.md` y `CONSIGNA-TP.md`.
