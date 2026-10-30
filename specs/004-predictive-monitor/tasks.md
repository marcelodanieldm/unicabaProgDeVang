# Tareas: analítica predictiva y monitor

- **Especificación:** [spec.md](./spec.md)
- **Plan:** [plan.md](./plan.md)

## Refinamiento

- [ ] **T-038** Definir datos de entrada, horizonte y granularidad de predicción — Requisitos: FR-009, FR-010 — Criterios: AC-020, AC-021.
- [ ] **T-039** Definir baseline, métrica de evaluación y umbral de aceptación — Requisitos: FR-010 — Criterios: AC-020.
- [ ] **T-040** Aprobar reglas de criticidad y sugerencia de reposición — Requisitos: FR-012, FR-013 — Criterios: AC-022, AC-023.
- [ ] **T-041** Acordar contrato de datos y estrategia de integración Java/Python — Requisitos: FR-009, FR-014 — Criterios: AC-020, AC-021, AC-025.
- [ ] **T-042** Elegir biblioteca de visualización y acceso por rol — Requisitos: FR-011 — Criterios: AC-024.

## Implementación y verificación

- [ ] **T-043** Implementar validación de datos y estado sin predicción disponible — Requisitos: FR-009, FR-010 — Criterios: AC-021.
- [ ] **T-044** Implementar proyección y evaluación frente al baseline acordado — Requisitos: FR-009, FR-010 — Criterios: AC-020.
- [ ] **T-045** Implementar alertas y sugerencias conforme a las políticas aprobadas — Requisitos: FR-012, FR-013 — Criterios: AC-022, AC-023.
- [ ] **T-046** Integrar y probar el contrato entre el servicio Java y Python — Requisitos: FR-014, NFR-002 — Criterios: AC-020, AC-021, AC-025.
- [ ] **T-047** Implementar dashboard con tendencias, alertas y estados de error — Requisitos: FR-011, FR-012 — Criterios: AC-024, AC-025.
- [ ] **T-048** Probar visualización con datos suficientes, insuficientes y servicio no disponible — Requisitos: FR-011, NFR-002 — Criterios: AC-021, AC-024, AC-025.

## Cierre

- [ ] El método y sus límites se documentan junto con las métricas de evaluación.
- [ ] Las proyecciones no se presentan como hechos garantizados.
- [ ] Los estados de falta de datos, error e indisponibilidad se distinguen en el dashboard.
