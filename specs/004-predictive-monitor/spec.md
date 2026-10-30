# Especificación: analítica predictiva y monitor

- **Estado:** Borrador
- **Responsable:** Grupo 7
- **Última actualización:** 2026-10-29
- **Épica relacionada:** [MVP de inventario y predicción](../001-inventory-and-stock-prediction/spec.md)
- **Requisitos relacionados:** FR-009 a FR-014, NFR-002
- **Consigna relacionada:** `CONSIGNA-TP.md`, arquitectura Python y monitor predictivo del MVP.

## Problema y contexto

El sistema busca ayudar a anticipar quiebres de stock mediante la historia de ventas y los
niveles actuales de inventario. La consigna exige un dashboard que consuma el servicio
Python y muestre gráficos interactivos. La propuesta menciona estimación de demanda,
riesgo de agotamiento, criticidad de alertas y reposición sugerida.

El método, el horizonte y los datos mínimos del predictor no están definidos en las fuentes.
Esta especificación expresa resultados esperados y límites de comunicación sin imponer un
algoritmo.

## Objetivos

- Producir proyecciones por producto a partir de datos transaccionales disponibles.
- Mostrar gráficos y alertas en el monitor predictivo.
- Comunicar con claridad cuando una predicción no puede calcularse.
- Mantener diferenciados los datos reales del inventario y las estimaciones.

## No objetivos

- Garantizar que una proyección o alerta vaya a ocurrir.
- Elegir un algoritmo de aprendizaje automático sin comparar alternativas y acordar
  criterios de evaluación.
- Calcular una cantidad “óptima” de compra sin definir objetivo, restricciones y datos de
  reposición.
- Mostrar gráficas decorativas o resultados ficticios como si fueran predicciones reales.

## Personas y permisos

La propuesta presenta el monitor como herramienta de gestión y consulta. La autorización
de acceso a proyecciones debe alinearse con la matriz de roles aprobada en
[control de acceso](../002-access-control/spec.md).

## Historias de usuario

- Como administrador, quiero ver tendencias de demanda por producto para anticipar
  reposiciones.
- Como persona autorizada, quiero conocer la criticidad de los riesgos detectados para
  priorizar la revisión.
- Como usuario del monitor, quiero saber cuando no hay datos suficientes para interpretar
  correctamente la información.

## Requisitos

Esta capacidad detalla FR-009 a FR-014 y NFR-002 de la épica. No agrega requisitos generales
nuevos.

## Criterios de aceptación

### AC-020 — Proyección disponible

- **Dado** un producto con historial y datos de stock válidos según los mínimos acordados
- **Cuando** se solicita la analítica
- **Entonces** el servicio Python devuelve una proyección asociada al producto y al período
  que se acordó.
- **Verificación:** prueba de contrato y prueba del servicio con un conjunto de datos
  controlado.

### AC-021 — Datos insuficientes

- **Dado** un producto sin historial suficiente según la política aprobada
- **Cuando** se solicita una proyección
- **Entonces** el servicio indica que no hay resultado disponible y no inventa valores.
- **Verificación:** prueba unitaria e integración con historial insuficiente.

### AC-022 — Alertas de criticidad

- **Dado** que el cálculo detecta un riesgo clasificable con reglas aprobadas
- **Cuando** devuelve el resultado
- **Entonces** la alerta identifica el producto y su nivel de criticidad alta, media o baja.
- **Verificación:** pruebas de límites para cada categoría según política acordada.

### AC-023 — Sugerencia de reposición

- **Dado** que hay datos suficientes y una política de reposición aprobada
- **Cuando** el servicio calcula una recomendación
- **Entonces** devuelve una cantidad identificada como sugerencia, no como orden de compra
  garantizada.
- **Verificación:** pruebas del cálculo y de los límites definidos por la política.

### AC-024 — Visualización del monitor

- **Dado** que hay resultados analíticos disponibles
- **Cuando** una persona autorizada abre el dashboard
- **Entonces** ve gráficos interactivos con períodos, productos y unidades identificables.
- **Verificación:** prueba de aceptación del flujo de dashboard.

### AC-025 — Servicio no disponible o error de contrato

- **Dado** que el servicio de analítica no responde o devuelve datos inválidos
- **Cuando** el front-end solicita el monitor
- **Entonces** informa que no pudo cargar la analítica y conserva visible el estado de
  indisponibilidad, sin presentar valores ficticios.
- **Verificación:** pruebas de integración para timeout, error y respuesta inválida.

## Datos y validaciones

La propuesta identifica como entradas el historial transaccional de ventas y los niveles
actuales de stock. Antes de diseñar el contrato se debe decidir:

- Unidad temporal, rango y granularidad del historial.
- Identificadores y unidades de producto.
- Qué significa una venta neta ante devoluciones o cancelaciones.
- Frecuencia de actualización y momento de cálculo de proyecciones.
- Formato de período, valor proyectado, nivel de riesgo y estado de disponibilidad.
- Cómo representar incertidumbre, limitaciones y faltantes de datos.

## Casos límite y errores

- Sin historial o historial demasiado corto.
- Producto nuevo o sin ventas recientes.
- Datos faltantes, duplicados, desordenados o con períodos sin observaciones.
- Stock nulo, negativo o desactualizado.
- Servicio Python indisponible o lento.
- Respuesta con versión o esquema incompatible.
- Error del modelo: debe propagarse como indisponibilidad controlada y no como predicción
  válida.

## Decisiones pendientes

- Algoritmo base y comparación con una referencia sencilla.
- Horizonte y granularidad temporal.
- Cantidad mínima de datos y tratamiento de períodos sin ventas.
- Métrica y umbral de evaluación del modelo.
- Definición de criticidad y fórmula de sugerencia de compra.
- Cálculo síncrono o asíncrono y estrategia de actualización.
- Fuente de datos para Python y contrato REST/JSON.
- Biblioteca de visualización del front-end.
- Acceso a datos predictivos según roles.

## Trazabilidad

| Fuente | Relación |
|---|---|
| `CONSIGNA-TP.md` — microservicio Python y monitor del MVP | AC-020 a AC-025. |
| `README.md` — rol del módulo predictivo | Proyecciones, alertas y reposición. |
| Épica `001` | FR-009 a FR-014, NFR-002 y AC-006, AC-007. |
