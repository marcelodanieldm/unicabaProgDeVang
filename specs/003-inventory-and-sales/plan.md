# Plan: catálogo, inventario y ventas

- **Especificación:** [spec.md](./spec.md)
- **Estado:** Borrador
- **Responsable:** Grupo 7

## Enfoque técnico

Centralizar las reglas de escritura de productos, ventas y movimientos en el núcleo
transaccional Java, de acuerdo con la arquitectura propuesta. Usar persistencia relacional
con límites transaccionales que abarquen tanto la operación de negocio como la
actualización del saldo.

No materializar el esquema final hasta acordar cantidades, unidades, baja de productos,
stock insuficiente y auditoría.

## Componentes afectados

| Componente | Cambio previsto |
|---|---|
| Front-end | Catálogo, indicadores de stock, formulario de venta y formulario de ingreso. |
| Servicio Java | CRUD, validaciones, operaciones de venta y movimientos. |
| Base de datos | Productos, categorías, ventas, detalles y movimientos; migraciones por definir. |
| Servicio Python | Consumo de datos de ventas y stock según contrato futuro. |

## Integridad y concurrencia

El diseño debe garantizar que ventas y movimientos no produzcan estados parciales. Evaluar
la estrategia de concurrencia al definir modelo y persistencia. Documentar la respuesta a
reintentos, concurrencia y fallos antes de cerrar la implementación.

## Contratos e interfaces

Definir esquemas y operaciones para:

- CRUD de producto y consulta de stock.
- Registro de venta con detalle de productos.
- Registro de ingreso de mercadería.
- Consulta de movimientos e historial requerido por auditoría o analítica.

Las rutas, paginación, errores y permisos dependen del contrato API aprobado.

## Estrategia de pruebas

| Nivel | Casos que cubre | Criterios |
|---|---|---|
| Unidad | Validación de datos y reglas de dominio. | AC-014 a AC-018 |
| Integración | Persistencia, relaciones, transacciones y permisos. | AC-014 a AC-019 |
| Aceptación | Flujo de catálogo, consulta, venta e ingreso desde la interfaz. | AC-014 a AC-018 |
| Concurrencia | Operaciones simultáneas sobre existencias, una vez acordada la política. | AC-018, AC-019 |

## Decisiones pendientes

- Modelo del inventario y de los movimientos.
- Política ante stock insuficiente.
- Baja lógica, cantidades fraccionarias y unidades.
- Idempotencia y auditoría.
- Contrato de API.
