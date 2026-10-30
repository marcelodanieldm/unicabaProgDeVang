# Consigna del Trabajo Práctico

## Datos de la asignatura

- **Asignatura:** Programación de Vanguardia
- **Carrera:** Licenciatura en Tecnologías Informáticas
- **Ciclo lectivo:** 2026
- **Docente:** Ing. Vázquez Alejandro

## Proyecto integrador

### Propuesta abierta de desarrollo de un proyecto innovador

Cada equipo elige autónomamente una problemática, un dominio o un tipo de aplicación
para desarrollar desde cero. El proyecto puede enfocarse en:

- Una solución útil para la comunidad o la gestión universitaria.
- Un proyecto de innovación, emprendimiento o startup.
- El prototipo inicial para el Trabajo Final de Carrera o una tesis.
- Una herramienta o sistema que resuelva una necesidad del mercado o un caso real.

## Requisitos técnicos de arquitectura

El proyecto debe diseñarse y desarrollarse desde cero con una arquitectura basada en
microservicios que incluya:

- **Front-end:** interfaz web o móvil interactiva.
- **Microservicio 1 — Java:** núcleo del negocio, incluyendo autenticación, gestión de
  usuarios y roles, lógica transaccional y APIs REST o gRPC.
- **Microservicio 2 — Python:** análisis de datos y analítica predictiva, como estimación de
  demanda, proyección de métricas o recomendaciones.
- **Base de datos:** elección e implementación de una base relacional, NoSQL o híbrida,
  según los requisitos del dominio.

## Dinámica de trabajo y fases de entrega

La modalidad de trabajo es **Aprobación de Idea + Desarrollo Ágil**:

1. Propuesta de idea del grupo.
2. Revisión y aprobación docente.
3. Desarrollo ágil con Git y construcción del MVP.
4. Presentación.

### Fase 1 — Propuesta de idea y dominio

Antes de comenzar a programar, cada grupo debe entregar una propuesta breve que detalle:

1. **Definición de la problemática:** qué sistema se construirá, a quién estará dirigido y
   cuál será su finalidad (universitaria, laboral, trabajo final u otra).
2. **Casos de uso principales:** funcionalidades clave y rol del módulo predictivo.
3. **Propuesta técnica inicial:** stack tecnológico, justificación de la base de datos y
   mockups preliminares.

Una vez revisada y aprobada la propuesta por la cátedra, el equipo queda habilitado para
iniciar el desarrollo.

### Fase 2 — Gestión y planificación

Una vez aprobada la propuesta, la gestión se realiza mediante herramientas de control de
versiones y tableros. Se requiere:

- Un repositorio del proyecto con estructura clara.
- Un tablero de trabajo (GitHub Projects, Trello o Jira) con historias de usuario y tareas
  asignadas por integrante.
- Registro continuo de commits, pull requests y minutas de reunión adjuntas en el
  repositorio.

## Funcionalidades mínimas del MVP

1. **Seguridad:** registro e inicio de sesión con control de acceso basado en roles.
2. **Gestión de datos:** operaciones CRUD e ingesta de datos manual o mediante el consumo
   de APIs externas.
3. **Monitor predictivo:** pantalla o dashboard en el front-end que consuma el
   microservicio Python y muestre gráficos interactivos con predicciones del
   comportamiento del sistema.
4. **Documentación:** documentación técnica disponible para el proyecto.

## Entregables obligatorios

**Fecha límite indicada en la consigna: 12-11.** El documento fuente no especifica el año
de esta fecha.

### 1. Documentación del proyecto (PDF)

Debe incluir:

- Carátula oficial e integrantes.
- Descripción detallada del problema elegido y su valor (universitario, laboral, trabajo
  final u otro).
- Diagrama de arquitectura que muestre la comunicación entre microservicios, base de
  datos y front-end.
- Justificación de las tecnologías y del motor de base de datos seleccionados.
- Mockups de pantallas finalizados.
- Estrategia o plan de pruebas (QA, pruebas unitarias o de integración).
- Plataforma y propuesta para el despliegue de la aplicación.
- Evidencias de gestión: minutas de reunión y capturas del tablero.

### 2. Presentación visual

Presentación en PPT, Canva o herramienta similar, con un resumen ejecutivo enfocado en
la solución, la arquitectura y una demostración.

### 3. Código fuente (PoC / MVP)

Repositorio funcional que integre:

- Front-end.
- Microservicio Java.
- Microservicio Python con gráficos predictivos.
- Base de datos.

## Rúbrica de corrección

| Criterio | Descripción | Puntaje |
|---|---|---:|
| Propuesta e innovación del proyecto | Claridad y valor de la idea elegida (utilidad universitaria, proyecto personal o trabajo final) y adecuada definición del problema. | 15 puntos |
| Arquitectura de microservicios | Correcta separación de responsabilidades entre los servicios Java y Python y el front-end, con comunicación fluida. | 20 puntos |
| Funcionalidades del MVP y predictor | Implementación del CRUD, autenticación por roles y generación y visualización gráfica efectiva de predicciones en el front-end. | 25 puntos |
| Selección de tecnologías y base de datos | Fundamentación técnica del stack y justificación de la arquitectura de datos según el problema. | 10 puntos |
| Gestión ágil y repositorio (Git) | Uso continuo de Git, flujo de ramas, PRs, tablero de tareas (Projects/Jira) y registro de minutas. | 15 puntos |
| Documentación, pruebas y despliegue | Calidad del informe, diagramas claros, mockups representativos, plan de pruebas y viabilidad del despliegue. | 10 puntos |
| Exposición y demostración oral | Manejo de la presentación, defensa técnica y funcionamiento en vivo del prototipo. | 5 puntos |
| **Total** |  | **100 puntos** |

## Relación con la propuesta del grupo

La propuesta inicial del sistema de inventario y predicción de quiebres de stock está
documentada en [README.md](./README.md). Debe evolucionar para cubrir los requisitos del
MVP y los entregables descritos aquí; en particular, la integración funcional de ambos
microservicios, el dashboard predictivo, las pruebas, el despliegue y las evidencias de
gestión.

## Fuente

Contenido organizado a partir del PDF de la consigna del Trabajo Práctico de Programación
de Vanguardia, ciclo lectivo 2026.
