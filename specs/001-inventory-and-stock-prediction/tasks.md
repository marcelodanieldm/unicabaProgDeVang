# Tareas: MVP de inventario y predicción de quiebres de stock

- **Especificación:** [spec.md](./spec.md)
- **Plan:** [plan.md](./plan.md)
- **Estado general:** Pendiente de refinamiento y planificación en el tablero del grupo.

Estas tareas describen trabajo inicial a desglosar en historias y asignar a integrantes.
No implican que las decisiones pendientes de la especificación estén ya aprobadas.

## Descubrimiento y decisiones

- [ ] **T-001** Confirmar alcance del MVP y permisos por rol con el equipo — Requisitos: FR-001, FR-002 — Componente: producto.
- [ ] **T-002** Definir reglas de stock, ventas, ingresos, cancelaciones y movimientos — Requisitos: FR-006, FR-007, FR-008, NFR-001 — Componente: negocio.
- [ ] **T-003** Definir el modelo de datos y migraciones iniciales — Requisitos: FR-003 a FR-008 — Componente: base de datos.
- [ ] **T-004** Acordar contratos REST/JSON y estrategia de integración de analítica — Requisitos: FR-009 a FR-014 — Componente: integración.
- [ ] **T-005** Acordar algoritmo, horizonte, evaluación y reglas de criticidad/reposición — Requisitos: FR-009, FR-010, FR-012, FR-013 — Componente: analítica.
- [ ] **T-006** Elegir versiones del stack, biblioteca de gráficos y plataforma de despliegue — Requisitos: NFR-002, AC-008 — Componente: arquitectura.

## Seguridad y núcleo transaccional

- [ ] **T-007** Especificar y construir el flujo de registro e inicio de sesión — Requisitos: FR-001, AC-001 — Componente: servicio Java/front-end.
- [ ] **T-008** Aplicar autorización por rol en las operaciones protegidas — Requisitos: FR-002, AC-002 — Componente: servicio Java.
- [ ] **T-009** Implementar alta, consulta, modificación y baja de productos — Requisitos: FR-003, FR-004, AC-003 — Componente: servicio Java/base de datos.
- [ ] **T-010** Implementar consulta de stock y registro de movimientos de inventario — Requisitos: FR-005, FR-006, AC-005 — Componente: servicio Java/base de datos.
- [ ] **T-011** Implementar registro transaccional de ventas y actualización consistente de stock — Requisitos: FR-007, FR-008, NFR-001, AC-004 — Componente: servicio Java/base de datos.

## Analítica y experiencia de usuario

- [ ] **T-012** Implementar interfaz para login, catálogo y consulta de inventario — Requisitos: FR-001 a FR-005 — Componente: front-end.
- [ ] **T-013** Implementar interfaz de registro de ventas e ingresos de mercadería — Requisitos: FR-006 a FR-008 — Componente: front-end.
- [ ] **T-014** Implementar cálculo y API de proyecciones, según el método aprobado — Requisitos: FR-009, FR-010 — Componente: servicio Python.
- [ ] **T-015** Implementar alertas y sugerencias de reposición según reglas aprobadas — Requisitos: FR-012, FR-013 — Componente: servicio Python.
- [ ] **T-016** Integrar resultados predictivos y estados sin datos en el dashboard — Requisitos: FR-011, AC-006, AC-007 — Componente: front-end/integración.

## Verificación y entrega académica

- [ ] **T-017** Añadir pruebas unitarias, de integración y aceptación vinculadas a criterios — Requisitos: NFR-003, AC-001 a AC-008 — Componente: todos.
- [ ] **T-018** Documentar arquitectura, stack, contratos, modelo de datos y decisiones — Requisitos: FR-015, AC-008 — Componente: documentación.
- [ ] **T-019** Finalizar mockups, estrategia de pruebas y propuesta de despliegue — Requisitos: AC-008 — Componente: documentación.
- [ ] **T-020** Mantener tablero, asignaciones, commits, PRs y minutas de reunión — Fuente: `CONSIGNA-TP.md`, Fase 2 y rúbrica — Componente: gestión.
- [ ] **T-021** Preparar documentación PDF, presentación visual y demostración funcional — Fuente: `CONSIGNA-TP.md`, entregables y rúbrica — Componente: entrega.

## Verificación de finalización

- [ ] Cada criterio de aceptación tiene una prueba o verificación documentada.
- [ ] Las tareas implementadas están vinculadas con requisitos y asignadas en el tablero.
- [ ] Los contratos entre servicios y el front-end están documentados y probados.
- [ ] La lista de decisiones pendientes se resolvió o se registró explícitamente como
  limitación aprobada del MVP.
- [ ] Los elementos de entrega y evaluación de `CONSIGNA-TP.md` tienen evidencia localizable.
