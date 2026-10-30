# Tareas: catálogo, inventario y ventas

- **Especificación:** [spec.md](./spec.md)
- **Plan:** [plan.md](./plan.md)

## Refinamiento

- [ ] **T-028** Definir modelo de productos, categorías, cantidades y validaciones — Requisitos: FR-003, FR-004 — Criterios: AC-014, AC-015.
- [ ] **T-029** Aprobar políticas de stock insuficiente, baja, devolución y cancelación — Requisitos: FR-006 a FR-008, NFR-001 — Criterios: AC-015, AC-018, AC-019.
- [ ] **T-030** Definir modelo y contrato de movimientos — Requisitos: FR-006, FR-008 — Criterios: AC-017 a AC-019.
- [ ] **T-031** Definir contrato API de catálogo, stock, ventas e ingresos — Requisitos: FR-003 a FR-008 — Criterios: AC-014 a AC-018.

## Implementación y verificación

- [ ] **T-032** Crear migraciones y persistencia para catálogo — Requisitos: FR-003, FR-004 — Criterios: AC-014, AC-015.
- [ ] **T-033** Implementar CRUD y consulta de productos — Requisitos: FR-003, FR-004 — Criterios: AC-014, AC-015.
- [ ] **T-034** Implementar consulta de stock y registro de movimientos — Requisitos: FR-005, FR-006 — Criterios: AC-016, AC-017.
- [ ] **T-035** Implementar registro transaccional de ventas y actualización de stock — Requisitos: FR-007, FR-008, NFR-001 — Criterios: AC-018, AC-019.
- [ ] **T-036** Construir pantallas de catálogo, venta e ingreso — Requisitos: FR-003 a FR-008 — Criterios: AC-014 a AC-018.
- [ ] **T-037** Probar fallos transaccionales, permisos y casos límite acordados — Requisitos: FR-002, NFR-001 — Criterios: AC-015, AC-018, AC-019.

## Cierre

- [ ] Cada endpoint de escritura tiene autorización y validación probadas.
- [ ] La actualización de stock es consistente ante éxito y fallo.
- [ ] El contrato API y el modelo de datos están documentados.
