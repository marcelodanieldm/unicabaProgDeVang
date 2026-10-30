# Plan: autenticación y control de acceso

- **Especificación:** [spec.md](./spec.md)
- **Estado:** Borrador
- **Responsable:** Grupo 7

## Enfoque técnico

Mantener la decisión de mecanismo de autenticación abierta hasta que el grupo la registre
como aceptada. La propuesta inicial menciona Spring Security y JWT; el plan de
implementación debe confirmar esa elección antes de fijar contratos y dependencias.

La autorización debe verificarse en el servicio que ejecuta la operación. La interfaz
puede adaptar navegación por rol, pero no sustituye la autorización del servidor.

## Componentes afectados

| Componente | Cambio previsto |
|---|---|
| Front-end | Formulario de login y presentación de funciones acorde al rol. |
| Servicio Java | Autenticación, gestión de identidades y controles de autorización. |
| Base de datos | Persistencia de identidades, roles y asignaciones según esquema aprobado. |
| Servicio Python | Definir si recibe solicitudes autenticadas y cómo valida el origen. |

## Contratos e interfaces

Definir endpoints, forma de autenticación, expiración y errores en una decisión técnica
aceptada. Las respuestas no deben revelar la existencia de una cuenta ante credenciales
inválidas.

## Seguridad y pruebas

- Probar acceso permitido y denegado en cada rol y operación.
- Confirmar que el servidor rechaza llamadas directas sin autorización.
- No almacenar credenciales en texto plano ni registrar secretos de sesión.
- Revisar permisos por defecto y cuentas de demostración antes de la entrega.

## Decisiones pendientes

- Política de alta de usuarios y matriz de permisos.
- Mecanismo de sesión, expiración y revocación.
- Autenticación de servicio a servicio.
- Campos y ciclo de vida de usuario.
