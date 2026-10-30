# Plan: analítica predictiva y monitor

- **Especificación:** [spec.md](./spec.md)
- **Estado:** Borrador
- **Responsable:** Grupo 7

## Enfoque técnico

Separar el cálculo analítico del servicio transaccional, conforme a la consigna. La
propuesta menciona Python, FastAPI, Pandas, NumPy y Scikit-learn, pero estas herramientas
deben confirmarse en la decisión de stack antes de fijar dependencias.

Comenzar con un contrato de datos y un conjunto de referencia controlado. Acordar política
de datos insuficientes y baseline antes de comparar un modelo más complejo. Tratar cada
resultado como una estimación con metadatos suficientes para interpretarlo; no retornar
una proyección con forma de éxito cuando el cálculo falla.

## Componentes afectados

| Componente | Cambio previsto |
|---|---|
| Servicio Java | Exponer o preparar datos transaccionales de ventas y stock según el contrato. |
| Servicio Python | Validar entradas, calcular proyección/alertas y expresar estados sin resultado. |
| Front-end | Dashboard, gráficos, alertas y estados de carga, error y datos insuficientes. |
| Base de datos | Proveer datos de ventas y productos; persistencia de predicciones solo si se acuerda. |

## Contratos e interfaces

Definir mediante especificación de API:

- Identificador de producto, datos históricos y stock de referencia.
- Período y horizonte de predicción.
- Unidad, valores, estado de disponibilidad y metadata temporal.
- Niveles de alerta y sugerencias, si las políticas se aprueban.
- Respuestas para validación, datos insuficientes, indisponibilidad y errores internos.

El origen y la frecuencia de sincronización de datos deben quedar documentados. No
compartir una base de datos entre servicios por conveniencia sin una decisión explícita.

## Estrategia de pruebas

| Nivel | Casos que cubre | Criterios |
|---|---|---|
| Unidad | Validación de datos y cálculos según algoritmo aprobado. | AC-020 a AC-023 |
| Contrato | Esquemas, unidades, estados y errores de API. | AC-020 a AC-023, AC-025 |
| Integración | Consumo de datos, disponibilidad y propagación de errores. | AC-020, AC-021, AC-025 |
| Aceptación | Carga del monitor, gráficos, alertas y fallos visibles. | AC-022 a AC-025 |
| Evaluación del modelo | Comparación con baseline usando datos de prueba documentados. | AC-020, AC-022, AC-023 |

## Despliegue y operación

Documentar configuración del servicio y dependencias, datos de prueba y variables
necesarias sin secretos. Acordar comportamiento cuando el servicio no está disponible y
cómo se observan fallos de cálculo sin filtrar datos sensibles.

## Decisiones pendientes

- Método de acceso a ventas y stock.
- Esquema y versionado del contrato.
- Algoritmo, baseline, métricas y horizonte.
- Persistencia, programación y refresco de proyecciones.
- Biblioteca de gráficos y visualización de incertidumbre.
