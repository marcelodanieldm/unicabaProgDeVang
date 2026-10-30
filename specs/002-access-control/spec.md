# Especificación: autenticación y control de acceso

- **Estado:** Borrador
- **Responsable:** Grupo 7
- **Última actualización:** 2026-10-29
- **Épica relacionada:** [MVP de inventario y predicción](../001-inventory-and-stock-prediction/spec.md)
- **Requisitos relacionados:** FR-001, FR-002
- **Consigna relacionada:** `CONSIGNA-TP.md`, requisitos técnicos y funcionalidades mínimas del MVP.

## Problema y contexto

El sistema debe permitir que las personas accedan a las funciones de gestión con permisos
acordes a su rol. La consigna exige registro e inicio de sesión con control de acceso por
roles. La propuesta identifica los roles administrador y operador/vendedor.

## Objetivos

- Autenticar a las personas usuarias del sistema.
- Autorizar operaciones de acuerdo con permisos asignados a cada rol.
- Mantener las operaciones protegidas en el servicio de negocio, no únicamente en la
  interfaz.

## No objetivos

- Definir el proveedor de identidad, formato de token o mecanismo de recuperación de
  credenciales antes de una decisión del grupo.
- Exponer registro público sin que se haya acordado quién puede crear cuentas.
- Definir permisos específicos que no hayan sido confirmados por el grupo.

## Personas y permisos

| Rol | Puede | Pendiente |
|---|---|---|
| Administrador | Gestionar usuarios y catálogo, consultar métricas globales y configurar parámetros según la propuesta. | Matriz exacta de permisos por operación. |
| Operador / vendedor | Consultar stock, registrar ventas e ingresos de mercadería según la propuesta. | Permisos sobre edición de productos, reportes y correcciones. |

## Historias de usuario

- Como persona usuaria, quiero iniciar sesión para acceder a las funciones habilitadas para
  mi rol.
- Como administrador, quiero gestionar usuarios y sus roles para controlar quién utiliza
  el sistema.
- Como responsable de negocio, quiero que las APIs rechacen operaciones no autorizadas
  aunque se invoquen fuera de la interfaz.

## Requisitos

Esta capacidad implementa FR-001 y FR-002 de la épica. No agrega requisitos generales
nuevos.

## Criterios de aceptación

### AC-009 — Inicio de sesión válido

- **Dado** un usuario activo con credenciales válidas
- **Cuando** envía sus credenciales
- **Entonces** obtiene una sesión autenticada asociada a su identidad y rol.
- **Verificación:** prueba de integración del flujo.

### AC-010 — Credenciales inválidas

- **Dado** un usuario inexistente, inactivo o con credenciales incorrectas
- **Cuando** intenta iniciar sesión
- **Entonces** el sistema rechaza el acceso y no revela si la cuenta existe.
- **Verificación:** pruebas de integración para cada condición.

### AC-011 — Operación autorizada

- **Dado** un usuario autenticado cuyo rol tiene permiso para una operación
- **Cuando** invoca la operación
- **Entonces** la solicitud puede continuar su validación de negocio.
- **Verificación:** prueba de autorización por rol.

### AC-012 — Operación no autorizada

- **Dado** un usuario autenticado sin permiso para una operación
- **Cuando** la invoca directamente
- **Entonces** el servicio rechaza la solicitud y no modifica datos.
- **Verificación:** prueba de integración que compruebe respuesta y ausencia de cambios.

### AC-013 — Usuario no autenticado

- **Dado** una operación protegida
- **Cuando** se invoca sin credenciales válidas
- **Entonces** el servicio rechaza la solicitud sin ejecutar la operación.
- **Verificación:** prueba de integración de endpoint protegido.

## Datos y validaciones

La propuesta incluye usuarios y roles, pero deja pendientes los campos, estados de cuenta,
restricciones de unicidad y flujo de alta. Las credenciales deben almacenarse y procesarse
con mecanismos seguros acordes a la tecnología que el grupo apruebe.

## Interfaces y dependencias

- Pantalla de login y navegación en función del rol.
- Endpoints de autenticación y gestión de usuarios por definir.
- Servicio Java como punto de aplicación de autorización según la propuesta inicial.
- Mecanismo de autenticación y propagación de identidad entre componentes pendiente de
  registrar en una decisión aceptada.

## Casos límite y errores

- Credenciales incorrectas o cuenta no habilitada.
- Solicitud sin autenticación o con credenciales vencidas o inválidas.
- Rol inexistente o permiso no asignado.
- Repetición de una solicitud de gestión de usuarios.
- Intento de elevar permisos manipulando datos enviados por el cliente.

## Decisiones pendientes

- ¿El registro estará abierto o los usuarios serán creados por un administrador?
- ¿Qué acciones concretas puede realizar cada rol?
- ¿Qué mecanismo de sesión o token utilizará el sistema y cómo se revocará?
- ¿Cómo se protegerán los endpoints consumidos por el servicio predictivo?
- ¿Se requiere recuperación o cambio de contraseña en el alcance del MVP?

## Trazabilidad

| Fuente | Relación |
|---|---|
| `CONSIGNA-TP.md` — seguridad del MVP | Registro, inicio de sesión y control por roles; AC-009 a AC-013. |
| `README.md` — autenticación y roles | Administrador y operador/vendedor. |
| Épica `001` | FR-001, FR-002 y AC-001, AC-002. |
