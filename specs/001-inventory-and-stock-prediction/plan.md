# Plan: MVP de inventario y predicción de quiebres de stock

- **Especificación:** [spec.md](./spec.md)
- **Estado:** Borrador
- **Responsable:** Grupo 7

## Enfoque técnico

La arquitectura seguirá la separación exigida por la consigna entre interfaz de usuario,
núcleo transaccional y analítica. La propuesta inicial plantea Java con Spring Boot para el
núcleo, Python con FastAPI para predicción y PostgreSQL para persistencia, comunicados
mediante HTTP/REST y JSON. Estos elementos son la base propuesta, sujetos a confirmación
de versiones, contratos y decisiones pendientes.

El front-end debe integrar la autenticación, las operaciones de gestión y el dashboard.
Tailwind CSS y Chart.js o Recharts se mencionan como opciones preliminares; la biblioteca
de gráficos aún no está elegida.

## Componentes afectados

| Componente | Cambio previsto |
|---|---|
| Front-end | Login, catálogo, registro de ventas y dashboard con gráficos interactivos. Tecnología de aplicación pendiente de definición. |
| Servicio Java | Usuarios, roles, productos, ventas, movimientos, reglas transaccionales y APIs del núcleo. Spring Boot/JPA son opciones de la propuesta. |
| Servicio Python | Lectura o recepción de datos, cálculo y exposición de analítica. FastAPI y librerías científicas son opciones de la propuesta. |
| Base de datos | Persistencia relacional de usuarios, productos, categorías, ventas, detalles y movimientos. PostgreSQL es la selección propuesta. |

## Contratos e interfaces

Antes de implementar la integración se deben acordar:

- Contratos y versiones de las APIs REST y sus esquemas JSON.
- Operaciones que el front-end consume del servicio Java y del servicio Python.
- Representación de errores, datos ausentes y estados de carga.
- Mecanismo por el cual Python obtiene datos transaccionales (acceso a datos o API del
  núcleo) y sus límites de consistencia.
- Autenticación y autorización para llamadas desde el front-end y entre servicios.

No se deben duplicar reglas transaccionales del inventario en el servicio predictivo.

## Datos y migraciones

El modelo inicial debe validar las entidades y relaciones identificadas en `spec.md`.
Diseñar migraciones reproducibles y preservar las relaciones entre ventas, detalles,
productos y categorías. Definir tipos y restricciones para dinero, cantidades, fechas,
stock y baja lógica antes de cerrar el esquema.

## Seguridad y permisos

Implementar autenticación y autorización por rol en el núcleo de negocio. El front-end no
debe ser la única barrera de autorización. Los endpoints y permisos concretos deben
derivarse de la matriz de roles aprobada. No registrar contraseñas, tokens ni secretos.

## Estrategia de pruebas

| Nivel | Casos que cubre | Criterios relacionados |
|---|---|---|
| Unidad | Validaciones de entidades, permisos y reglas de actualización de stock. | AC-002 a AC-005 |
| Integración | Persistencia y atomicidad de ventas/movimientos; APIs y contratos entre componentes. | AC-001 a AC-007 |
| Aceptación | Login por rol, gestión de catálogo, venta, ingreso de stock y dashboard. | AC-001 a AC-008 |
| Analítica | Datos suficientes e insuficientes, salida coherente y respuesta no disponible. | AC-006, AC-007 |

Los umbrales de evaluación del predictor deben acordarse y quedar especificados antes de
usarlos como criterio de calidad.

## Despliegue y operación

La consigna solicita una plataforma y una propuesta de despliegue. La plataforma concreta
está pendiente de elección. Documentar cómo configurar y arrancar cada componente,
dependencias, conectividad, persistencia y datos de demostración sin incluir secretos.

## Riesgos y alternativas

- **Historial escaso:** el MVP puede no tener datos reales suficientes; definir datos de
  prueba o una respuesta explícita de predicción no disponible.
- **Consistencia de datos:** acordar cómo Python consume ventas y stock y con qué
  frecuencia se refrescan las proyecciones.
- **Alcance de seguridad:** detallar permisos por operación antes de exponer APIs.
- **Tiempo de entrega:** priorizar los criterios de mayor peso de la rúbrica y mantener
  evidencia de pruebas, gestión, documentación y despliegue.

## Decisiones pendientes

- Framework y versión del front-end.
- Java 17 o 21 y versiones finales de Spring.
- Biblioteca de visualización: Chart.js o Recharts.
- Contratos de APIs y estrategia de integración entre Java y Python.
- Modelo de autenticación, registro y propagación de roles.
- Esquema de dominio y reglas de stock insuficiente, cancelaciones y devoluciones.
- Algoritmo, horizonte, evaluación y reglas de alertas/reposición.
- Plataforma y estrategia de despliegue.
