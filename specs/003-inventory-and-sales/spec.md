# Especificación: catálogo, inventario y ventas

- **Estado:** Borrador
- **Responsable:** Grupo 7
- **Última actualización:** 2026-10-29
- **Épica relacionada:** [MVP de inventario y predicción](../001-inventory-and-stock-prediction/spec.md)
- **Requisitos relacionados:** FR-003 a FR-008, NFR-001
- **Consigna relacionada:** `CONSIGNA-TP.md`, gestión de datos y funcionalidades del MVP.

## Problema y contexto

El sistema necesita mantener productos y existencias actualizados a partir de ventas e
ingresos de mercadería. La propuesta solicita operaciones CRUD, consulta de stock y
actualización automática de saldos. La consigna requiere CRUD e ingesta manual o mediante
APIs externas.

## Objetivos

- Administrar el catálogo con los atributos definidos en la propuesta.
- Consultar existencias actuales.
- Registrar ventas e ingresos de mercadería como movimientos trazables.
- Evitar que una operación confirmada deje saldos inconsistentes.

## No objetivos

- Definir integraciones con APIs externas concretas, ya que no se identificaron fuentes.
- Cerrar políticas de stock negativo, devoluciones, cancelaciones o ajustes sin acuerdo.
- Introducir compras a proveedores o procesos de abastecimiento completos no requeridos
  explícitamente.

## Personas y permisos

Los permisos detallados se rigen por la especificación de [control de acceso](../002-access-control/spec.md).

| Rol | Capacidad esperada según la propuesta |
|---|---|
| Administrador | Gestionar productos y consultar métricas globales. |
| Operador / vendedor | Consultar stock, registrar ventas e ingresar mercadería. |

## Historias de usuario

- Como administrador, quiero crear y actualizar productos para mantener el catálogo
  vigente.
- Como operador, quiero consultar el stock disponible antes de registrar una venta.
- Como vendedor, quiero registrar una venta y que el stock se actualice como parte de la
  misma operación.
- Como operador, quiero registrar un ingreso de mercadería para reflejar nuevas
  existencias.

## Requisitos

Esta capacidad detalla FR-003 a FR-008 y NFR-001 de la épica. No agrega requisitos generales
nuevos.

## Criterios de aceptación

### AC-014 — Alta y consulta de productos

- **Dado** un usuario con permisos administrativos y datos válidos
- **Cuando** crea un producto
- **Entonces** el producto queda disponible para consulta con categoría, precio, costo,
  stock actual y umbral mínimo.
- **Verificación:** prueba de integración de persistencia y lectura.

### AC-015 — Modificación y baja de producto

- **Dado** un producto existente y un usuario con permisos administrativos
- **Cuando** modifica o da de baja el producto
- **Entonces** los cambios se reflejan en el catálogo sin alterar indebidamente el
  historial de ventas.
- **Verificación:** pruebas de integración; la semántica de baja se debe acordar.

### AC-016 — Consulta de stock

- **Dado** un usuario con permiso de consulta
- **Cuando** solicita las existencias de un producto
- **Entonces** recibe el saldo vigente asociado al producto.
- **Verificación:** prueba de integración de lectura de stock.

### AC-017 — Ingreso de mercadería

- **Dado** un usuario autorizado y un ingreso válido
- **Cuando** confirma el movimiento
- **Entonces** el movimiento queda registrado y el stock se incrementa de forma
  consistente.
- **Verificación:** prueba de integración que revise movimiento y saldo.

### AC-018 — Venta con actualización de stock

- **Dado** una venta válida con uno o más productos
- **Cuando** se confirma
- **Entonces** la venta y sus detalles quedan registrados y se descuentan las cantidades
  correspondientes sin dejar cambios parciales.
- **Verificación:** prueba de integración transaccional.

### AC-019 — Fallo durante una operación de stock

- **Dado** que ocurre un error al guardar una venta o movimiento
- **Cuando** la operación no puede completarse
- **Entonces** no queda una venta parcial ni un saldo actualizado sin su movimiento
  correspondiente.
- **Verificación:** prueba de integración con fallo inducido dentro del límite
  transaccional.

## Datos y validaciones

La propuesta identifica productos, categorías, usuarios, ventas y detalles de venta.
Confirmar en el diseño:

- Tipos y límites de precio, costo, cantidades y stock.
- Unidad de medida y posibilidad de fracciones.
- Identificador o código de producto y reglas de unicidad.
- Tratamiento de productos inactivos y referencias históricas.
- Fecha, autor y motivo de los movimientos.
- Relación entre el detalle de venta y el movimiento que actualiza stock.

## Casos límite y errores

- Producto o categoría inexistente.
- Datos obligatorios ausentes o valores fuera de rango.
- Venta con múltiples productos cuando falla una de las líneas.
- Dos operaciones concurrentes sobre la misma existencia.
- Stock insuficiente: comportamiento pendiente de aprobación.
- Baja de producto referenciado por ventas históricas.
- Reintento de una solicitud tras un error de red: estrategia de idempotencia pendiente.

## Decisiones pendientes

- ¿Se bloquean ventas que exceden el stock disponible?
- ¿Se conserva el producto mediante baja lógica o se elimina físicamente?
- ¿Cómo se registran devoluciones, cancelaciones, ajustes y conteos?
- ¿Las cantidades admiten fracciones y cuál es su unidad?
- ¿Se requiere clave de idempotencia para ventas?
- ¿Qué datos de origen y auditoría se guardan en cada movimiento?

## Trazabilidad

| Fuente | Relación |
|---|---|
| `CONSIGNA-TP.md` — gestión de datos del MVP | CRUD e ingesta; AC-014 a AC-019. |
| `README.md` — inventario y ventas | Atributos, roles y actualización de existencias. |
| Épica `001` | FR-003 a FR-008, NFR-001 y AC-003 a AC-005. |
