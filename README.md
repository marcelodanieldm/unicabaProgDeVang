# Sistema Inteligente de Gestión de Inventario

## Contexto del proyecto

Propuesta de trabajo práctico para la materia **Programación de Vanguardia** de la
Licenciatura en Tecnologías Digitales de la Universidad de la Ciudad de Buenos Aires.

- **Grupo:** 7
- **Integrantes:** Florencia Estrada, Nicolas Fernandez y Daniel Marcelo Lucero
- **Propósito:** construir una plataforma para gestionar inventario y ventas, y anticipar
  quiebres de stock mediante proyecciones de demanda.

Este documento organiza el contenido de la propuesta inicial. Las tecnologías indicadas
son decisiones preliminares y algunas alternativas siguen abiertas.

## Desarrollo guiado por especificaciones

El proyecto utiliza una estructura de **Spec-Driven Development (SDD)** para convertir la
consigna y esta propuesta en requisitos verificables antes de implementar cada funcionalidad.
El índice, el flujo de trabajo y la especificación inicial del MVP están en
[specs/README.md](./specs/README.md).

El flujo asistido por MCP y skills, con aprobación humana obligatoria antes de editar, se
describe en [.specify/workflow/README.md](./.specify/workflow/README.md). La configuración
de VS Code está en [.vscode/mcp.json](./.vscode/mcp.json).

## Problema y público objetivo

Pequeños y medianos comercios minoristas (PyMEs y retail), minimercados y centros de
distribución locales suelen administrar sus existencias con métodos manuales, como
planillas de cálculo. Esto dificulta conocer el stock en tiempo real y estimar cuándo
reponer mercadería.

El sistema busca automatizar el seguimiento de productos y ayudar a evitar:

- **Quiebres de stock**, que pueden ocasionar pérdidas de ventas.
- **Sobrestock**, que inmoviliza capital innecesariamente.

El proyecto se plantea como una herramienta para atender una necesidad real del mercado.

## Alcance funcional propuesto

### Usuarios y permisos

El acceso se controla por roles (RBAC):

- **Administrador:** administra el catálogo de productos y los usuarios, consulta métricas
  globales y configura parámetros del sistema.
- **Operador o vendedor:** registra las ventas diarias, consulta el stock disponible e
  ingresa compras o mercadería.

### Inventario y ventas

- Operaciones de alta, baja, modificación y consulta (CRUD) de productos.
- Datos de producto previstos: categoría, precio, costo, stock actual y umbral mínimo de
  seguridad.
- Registro de movimientos de inventario y ventas.
- Actualización automática del stock cuando se registra una transacción.

### Analítica predictiva

Un microservicio Python utilizará el historial de ventas y el stock actual para estimar la
rotación de cada producto y la demanda futura. La propuesta contempla:

- Estimar cuándo podría agotarse un producto si continúa la tendencia de consumo.
- Generar alertas tempranas con criticidad **alta**, **media** o **baja**.
- Calcular una cantidad sugerida de compra para reducir el riesgo de quedarse sin
  disponibilidad.
- Proveer datos estructurados para gráficos de tendencias y proyecciones en el dashboard.

La estimación de agotamiento y el lote sugerido son objetivos funcionales de la propuesta;
el método y las reglas de cálculo deberán definirse durante el diseño e implementación.

## Arquitectura y tecnologías preliminares

La solución se propone como componentes desacoplados:

| Componente | Tecnología propuesta | Responsabilidades |
|---|---|---|
| Front-end | Tailwind CSS; Chart.js o Recharts para visualizaciones | Interfaz de gestión y dashboard predictivo. La biblioteca de gráficos es una alternativa pendiente de elección. |
| Núcleo de negocio | Java 17 o 21, Spring Boot, Spring Security, JWT y Spring Data JPA | Autenticación y autorización, APIs REST para productos y ventas, transacciones seguras y acceso a datos. |
| Analítica predictiva | Python 3.11+, FastAPI, Pandas, NumPy y Scikit-learn | Procesamiento analítico asíncrono, proyecciones y endpoints REST para el monitor predictivo. |
| Base de datos | PostgreSQL | Persistencia relacional del dominio, incluidos usuarios, ventas, detalles de venta, productos y categorías. |

La comunicación entre los servicios y el front-end se plantea mediante **HTTP/REST** con
mensajes **JSON**.

### Justificación de PostgreSQL

La propuesta selecciona una base de datos relacional por los siguientes motivos:

1. **Integridad transaccional (ACID):** las entradas y deducciones de stock deben
   mantenerse consistentes y atómicas.
2. **Relaciones naturales del dominio:** usuarios, ventas, detalles de venta, productos y
   categorías tienen relaciones definidas.
3. **Compatibilidad con el stack:** integración con Spring Data JPA/Hibernate y posibilidad
   de consultar o extraer datos desde Python con herramientas como Pandas o SQLAlchemy.

## Pantallas conceptuales

1. **Inicio de sesión:** acceso seguro y navegación según el rol asignado (administrador o
   vendedor).
2. **Catálogo e inventario:** tabla con búsqueda, indicadores de estado del stock y
   formularios o modales para crear y editar artículos.
3. **Registro de ventas:** carga ágil de ventas mediante selección de productos y
   actualización inmediata de existencias.
4. **Monitor predictivo:** gráficos temporales, alertas de quiebre inminente y sugerencias
   de compra provistos por el servicio de analítica.

## Referencia

Contenido organizado a partir del documento de propuesta **“Fase 1 - Grupo 7”**,
presentado para la materia Programación de Vanguardia.
