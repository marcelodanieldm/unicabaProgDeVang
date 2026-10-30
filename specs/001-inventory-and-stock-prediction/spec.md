# Especificación: MVP de inventario y predicción de quiebres de stock

- **Estado:** Borrador
- **Responsable:** Grupo 7
- **Última actualización:** 2026-10-29
- **Consigna relacionada:** `CONSIGNA-TP.md`, requisitos técnicos, Fase 1 y funcionalidades mínimas del MVP.

## Problema y contexto

Pequeños y medianos comercios minoristas necesitan mantener un registro confiable de
productos, ventas y existencias. La gestión manual dificulta conocer el stock disponible y
anticipar reposiciones. El proyecto propone un sistema con un núcleo transaccional y un
módulo separado de analítica predictiva.

Esta primera especificación define el alcance funcional del MVP a partir de la consigna y
la propuesta del grupo. No determina todavía algoritmos de predicción, detalles de
implementación ni reglas de inventario que no hayan sido acordadas.

## Objetivos

- Gestionar productos, usuarios, roles, ventas y movimientos de inventario.
- Mantener actualizadas las existencias ante operaciones transaccionales.
- Entregar proyecciones y alertas de stock en un dashboard mediante el servicio Python.
- Satisfacer las funcionalidades mínimas y los entregables técnicos del trabajo práctico.

## No objetivos

- Definir como certeza una predicción sobre agotamiento o una cantidad sugerida de compra.
- Integrar proveedores, compras externas o APIs de terceros no identificados en el alcance
  actual.
- Elegir definitivamente entre opciones tecnológicas aún abiertas en la propuesta.
- Cubrir requerimientos de producción que no se hayan especificado y aceptado para el MVP.

## Personas y permisos

| Rol | Puede | No puede |
|---|---|---|
| Administrador | Gestionar usuarios y productos, consultar métricas globales y configurar parámetros. | Acceder sin autenticación. |
| Operador / vendedor | Consultar stock, registrar ventas e ingresar compras o mercadería. | Gestionar usuarios o parámetros administrativos salvo autorización explícita posterior. |

La consigna exige autenticación y control de acceso basado en roles. La propuesta describe
estos dos roles, pero las asignaciones exactas de permisos por endpoint y pantalla deben
confirmarse en la especificación de seguridad antes de implementar.

## Historias de usuario

- Como **administrador**, quiero gestionar el catálogo y los usuarios para mantener
  actualizada la operación del comercio.
- Como **operador o vendedor**, quiero consultar existencias y registrar ventas para operar
  con datos de stock actualizados.
- Como **administrador**, quiero consultar alertas y proyecciones para anticipar la
  reposición de productos.

## Requisitos funcionales

### Seguridad y roles

- **FR-001:** El sistema deberá permitir registrar e iniciar sesión.
- **FR-002:** El sistema deberá restringir las operaciones según los roles asignados.

### Productos e inventario

- **FR-003:** El sistema deberá permitir crear, consultar, modificar y dar de baja
  productos.
- **FR-004:** El registro de producto deberá contemplar categoría, precio, costo, stock
  actual y umbral mínimo de seguridad.
- **FR-005:** El sistema deberá permitir consultar el stock disponible de los productos.
- **FR-006:** El sistema deberá registrar ingresos de mercadería y movimientos de
  inventario.

### Ventas

- **FR-007:** El sistema deberá permitir registrar ventas con los productos vendidos.
- **FR-008:** Al confirmar una venta, el sistema deberá actualizar las existencias
  correspondientes.

### Analítica y visualización

- **FR-009:** El servicio Python deberá ofrecer analítica basada en historial de ventas y
  niveles actuales de stock.
- **FR-010:** La solución deberá producir proyecciones de demanda o rotación por producto.
- **FR-011:** La solución deberá mostrar en el front-end gráficos interactivos basados en
  los datos del microservicio Python.
- **FR-012:** El sistema deberá presentar alertas de riesgo de quiebre con niveles de
  criticidad alta, media o baja.
- **FR-013:** El sistema deberá presentar una sugerencia de reposición cuando los datos y
  las reglas acordadas permitan calcularla.

### Integración y documentación

- **FR-014:** Los componentes deberán intercambiar datos a través de interfaces
  documentadas, usando el protocolo y formato acordados para el MVP.
- **FR-015:** El repositorio deberá disponibilizar documentación técnica del proyecto.

## Requisitos no funcionales

- **NFR-001:** Las operaciones que modifiquen existencias deberán preservar la integridad
  transaccional.
- **NFR-002:** Las interfaces entre componentes deberán estar documentadas y permitir
  verificar la integración entre front-end, servicios y base de datos.
- **NFR-003:** Las pruebas y su relación con los criterios de aceptación deberán formar
  parte de la documentación técnica.

No se fijan umbrales de rendimiento, disponibilidad ni volumen porque no están definidos
en las fuentes de contexto.

## Reglas de negocio y decisiones por resolver

- **BR-001:** Una venta confirmada descuenta las cantidades vendidas de las existencias de
  sus productos. El manejo de ventas inválidas o no confirmadas está pendiente.
- **BR-002:** Una recepción o ingreso de mercadería incrementa las existencias. La
  definición del flujo de compra y los datos requeridos queda pendiente.
- **BR-003:** La predicción depende de los datos disponibles; el sistema no deberá
  comunicar proyecciones como valores garantizados.
- **PENDIENTE:** Definir si se permiten existencias negativas y cómo se rechazan o
  registran intentos de venta sin stock suficiente.
- **PENDIENTE:** Definir cancelaciones, devoluciones, correcciones y auditoría de
  movimientos.
- **PENDIENTE:** Definir horizonte de predicción, granularidad temporal, historial mínimo,
  tratamiento de períodos sin ventas y estrategia de evaluación del modelo.
- **PENDIENTE:** Definir fórmula o política para las criticidades y cantidades sugeridas
  de reposición.
- **PENDIENTE:** Definir si la creación de usuarios será abierta o administrada.
- **PENDIENTE:** Confirmar biblioteca de gráficos y versiones definitivas del stack.
- **PENDIENTE:** Confirmar contratos de API, errores, autenticación entre servicios y
  origen de los datos del servicio predictivo.

## Criterios de aceptación

### AC-001 — Autenticación

- **Dado** un usuario registrado con credenciales válidas
- **Cuando** inicia sesión
- **Entonces** el sistema le concede acceso autenticado asociado a su rol.
- **Verificación:** prueba de integración del flujo de inicio de sesión.

### AC-002 — Autorización por roles

- **Dado** un usuario autenticado con un rol asignado
- **Cuando** solicita una operación no permitida para ese rol
- **Entonces** el sistema rechaza la operación sin ejecutar cambios.
- **Verificación:** pruebas de autorización para cada operación protegida.

### AC-003 — Gestión de productos

- **Dado** un usuario con permisos administrativos
- **Cuando** crea, consulta, modifica o da de baja un producto válido
- **Entonces** el catálogo refleja el cambio y permite consultar los atributos requeridos.
- **Verificación:** pruebas de integración CRUD y validación de datos.

### AC-004 — Registro de venta y stock

- **Dado** un usuario autorizado y productos disponibles
- **Cuando** registra una venta válida
- **Entonces** se registra la transacción y se actualizan las existencias de forma
  consistente.
- **Verificación:** prueba de integración que compruebe tanto la venta como los saldos.

### AC-005 — Ingreso de mercadería

- **Dado** un usuario autorizado
- **Cuando** registra un ingreso válido de mercadería
- **Entonces** queda registrado el movimiento y aumenta el stock correspondiente.
- **Verificación:** prueba de integración de movimiento y saldo.

### AC-006 — Dashboard predictivo

- **Dado** que hay datos de predicción disponibles para un producto
- **Cuando** una persona usuaria autorizada abre el monitor predictivo
- **Entonces** el front-end presenta los datos recibidos del servicio Python mediante
  gráficos interactivos.
- **Verificación:** prueba de contrato y prueba de aceptación del dashboard.

### AC-007 — Estado de predicción no disponible

- **Dado** que faltan datos o el servicio predictivo no devuelve una proyección
- **Cuando** se consulta el monitor
- **Entonces** la interfaz informa que la predicción no está disponible y no inventa una
  fecha o sugerencia.
- **Verificación:** prueba de integración con datos insuficientes o respuesta no disponible.

### AC-008 — Documentación y trazabilidad

- **Dado** el repositorio del proyecto
- **Cuando** el equipo prepara la entrega
- **Entonces** la documentación permite identificar arquitectura, tecnologías, mockups,
  pruebas, despliegue y evidencias de gestión requeridas.
- **Verificación:** revisión de checklist de entregables de `CONSIGNA-TP.md`.

## Datos y validaciones

La propuesta identifica las entidades de usuarios, ventas, detalles de venta, productos y
categorías. El producto contempla categoría, precio, costo, stock actual y umbral mínimo.
La forma exacta de representar unidades, moneda, precisión numérica, estado de baja,
identificadores y fechas debe definirse en el plan de datos.

Las ventas deben asociar productos y cantidades. El esquema definitivo de cabecera,
detalle, movimientos y relaciones queda pendiente de diseño y validación.

## Interfaces y dependencias

- La propuesta técnica sugiere APIs REST con JSON para la interoperabilidad.
- El núcleo Java administra las operaciones transaccionales y la persistencia relacional.
- El servicio Python expone resultados analíticos para el dashboard.
- La base propuesta es PostgreSQL.
- Endpoints, esquemas de entrada y salida, códigos de error y mecanismo de autenticación
  entre componentes están pendientes de definición en el plan.

## Casos límite y errores

- Credenciales inválidas o usuario sin permisos.
- Producto inexistente o con datos inválidos.
- Intento de venta con stock insuficiente: política pendiente de decisión.
- Error de persistencia durante una venta o movimiento: no debe quedar una actualización
  parcial del stock.
- Historial predictivo insuficiente, servicio Python indisponible o respuesta malformada:
  informar que no hay resultado disponible sin mostrar una predicción ficticia.

## Trazabilidad

| Fuente | Requisito / criterio relacionado |
|---|---|
| `CONSIGNA-TP.md` — arquitectura técnica | FR-001, FR-002, FR-009, FR-014 |
| `CONSIGNA-TP.md` — Fase 1, casos de uso y propuesta técnica | FR-003 a FR-013 |
| `CONSIGNA-TP.md` — funcionalidades mínimas del MVP | FR-001 a FR-002, FR-003, FR-011, FR-015 |
| `CONSIGNA-TP.md` — entregables obligatorios | AC-008 |
| `CONSIGNA-TP.md` — rúbrica, arquitectura y funcionalidades | NFR-001 a NFR-003, AC-002, AC-004, AC-006 |
| `README.md` — roles, inventario, ventas y analítica predictiva | FR-001 a FR-013 |
