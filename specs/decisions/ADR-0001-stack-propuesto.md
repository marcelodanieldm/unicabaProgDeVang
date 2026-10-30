# ADR-0001: Arquitectura y stack propuestos

- **Estado:** Propuesta
- **Fecha:** 2026-10-29
- **Responsable:** Grupo 7
- **Especificaciones afectadas:** [MVP](../001-inventory-and-stock-prediction/plan.md), [inventario y ventas](../003-inventory-and-sales/plan.md), [monitor predictivo](../004-predictive-monitor/plan.md)

## Contexto

La consigna requiere una interfaz, un microservicio Java, un microservicio Python y una base
de datos. La propuesta del grupo describe tecnologías para cada componente, pero aún deja
alternativas abiertas y no confirma versiones o contratos.

## Opciones consideradas

1. **Mantener la propuesta inicial:** Java con Spring Boot, Python con FastAPI, PostgreSQL,
   HTTP/REST y JSON; Tailwind CSS y Chart.js o Recharts para la interfaz.
2. **Elegir alternativas distintas:** permitido por la consigna si se fundamentan y se
   documentan.
3. **Posponer la elección final:** avanzar con requisitos y contratos neutrales a la
   implementación hasta que el grupo acuerde el stack.

## Decisión

La arquitectura y las tecnologías enumeradas en la propuesta se conservan como **base
propuesta**, no como decisión aprobada. El grupo debe confirmar el stack, las versiones,
la biblioteca de gráficos y la estrategia de comunicación antes de cerrar los planes de
implementación.

### Restricción: sin Docker

El grupo decidió **no utilizar Docker** para el desarrollo. Cada servicio (front-end, Java y
Python) se ejecuta localmente con su propio comando y puerto. PostgreSQL se instala
localmente o se usa una instancia en un servicio en la nube. Esta restricción no confirma
versiones ni proveedores concretos.

### Front-end confirmado (parcial)

El grupo confirmó el stack de front-end: **React con Vite, TypeScript, Tailwind CSS y
Chart.js**. Se ejecuta localmente con el servidor de desarrollo de Vite y se despliega sin
contenedores. Esta confirmación no incluye versiones; el backend, la base de datos y la
estrategia de comunicación siguen pendientes.

## Consecuencias

- Sin Docker: la configuración (credenciales, URLs, puertos) se externaliza en variables de
  entorno, con un archivo de ejemplo versionado y sin secretos.
- Los servicios se comunican entre puertos distintos, por lo que debe habilitarse CORS o un
  proxy de desarrollo.
- El grupo debe acordar las versiones de herramientas (JDK, Python, Node) para evitar
  diferencias entre entornos.
- Las migraciones de base de datos deben ser reproducibles para que cada integrante
  obtenga el mismo esquema.
- La propuesta de despliegue debe contemplar una plataforma que no dependa de contenedores.
- Los requisitos deben permanecer independientes de frameworks y versiones.
- Los planes pueden describir la arquitectura propuesta, identificándola como pendiente.
- No crear dependencias, scaffolding ni contratos irreversibles basados únicamente en esta
  propuesta.
- Una decisión aceptada debe actualizar este registro, los planes afectados y la
  documentación técnica.

## Confirmación

Confirmado parcialmente por el grupo: stack de front-end (React + Vite, TypeScript,
Tailwind CSS, Chart.js). Pendiente de confirmación: backend Java, servicio Python, base de
datos, versiones y estrategia de comunicación.

## Historial

- 2026-10-29: registro inicial como propuesta basada en `README.md` y `CONSIGNA-TP.md`.
- 2026-10-30: se registra la restricción de no usar Docker y sus consecuencias; el estado
  sigue en Propuesta.
- 2026-10-30: se confirma el stack de front-end (React + Vite, TypeScript, Tailwind CSS,
  Chart.js), sin Docker; el resto del stack sigue pendiente.
