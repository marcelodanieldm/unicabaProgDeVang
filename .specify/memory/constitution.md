# Constitución de desarrollo

Estos principios orientan las especificaciones, los planes, las tareas, la implementación
y las revisiones del proyecto. Si una decisión contradice la consigna, prevalece la
consigna; si la consigna deja una decisión abierta, la especificación debe marcarla como
pendiente y no asumirla silenciosamente.

## Principios

### 1. Especificar antes de implementar

- Cada funcionalidad debe tener una especificación con requisitos identificables y
  criterios de aceptación observables.
- Las decisiones y los supuestos deben quedar escritos antes de convertirse en
  comportamiento del sistema.
- El código debe satisfacer la especificación aprobada; no se debe usar el código como
  única fuente de verdad del comportamiento esperado.

### 2. Integridad del inventario y trazabilidad

- Cada operación que modifique existencias debe ser consistente y trazable.
- Ventas e ingresos de mercadería deben actualizar el stock mediante operaciones
  transaccionales.
- Las reglas para stock negativo, anulaciones, ajustes y concurrencia deben definirse en
  una especificación antes de implementarse.

### 3. Seguridad por diseño

- La autenticación y la autorización por roles son requisitos del MVP.
- Cada especificación que exponga operaciones debe definir quién puede realizarlas y qué
  datos puede consultar o modificar.
- No se deben incluir credenciales, secretos ni datos reales sensibles en el repositorio.

### 4. Separación de responsabilidades

- El front-end presenta flujos y visualizaciones, sin reemplazar las reglas de negocio.
- El servicio Java concentra el núcleo transaccional, usuarios, roles, productos y ventas.
- El servicio Python se ocupa de la analítica predictiva y expone resultados mediante una
  interfaz acordada.
- La comunicación entre componentes debe ser explícita, documentada y verificable.

### 5. Predicciones explicables y honestas

- Las salidas predictivas deben distinguirse de los datos transaccionales confirmados.
- Una proyección debe indicar el producto y el período al que corresponde, así como la
  incertidumbre o limitación relevante cuando el modelo la pueda estimar.
- No se debe mostrar una fecha de agotamiento ni una cantidad de reposición como certeza
  cuando los datos disponibles no permitan sostenerla.
- El método, los datos mínimos y el tratamiento de historial insuficiente requieren
  decisiones documentadas en la especificación correspondiente.

### 6. Calidad verificable

- Cada criterio de aceptación debe tener una forma de verificación, preferentemente una
  prueba automatizada apropiada al nivel (unidad, integración o aceptación).
- Los cambios deben conservar la separación entre servicios y no introducir
  comportamientos fuera de alcance sin actualizar la especificación.
- Las decisiones técnicas relevantes, pruebas y límites conocidos deben quedar
  documentados.

### 7. Entrega académica y gestión ágil

- El trabajo debe mantener trazabilidad desde la consigna y sus criterios de evaluación
  hasta requisitos, tareas y pruebas.
- El repositorio debe reflejar el trabajo ágil solicitado: commits, pull requests, tablero
  y minutas de reuniones.
- La documentación, los mockups, el plan de pruebas y la propuesta de despliegue forman
  parte del entregable y no son opcionales para la preparación de la entrega.

## Flujo mínimo de cambio

1. Crear o actualizar una especificación funcional y registrar su relación con la
   consigna.
2. Revisar requisitos, criterios de aceptación, permisos, datos y casos límite.
3. Elaborar un plan de diseño que identifique componentes, contratos, pruebas y decisiones
   pendientes.
4. Desglosar el trabajo en tareas vinculadas a requisitos.
5. Implementar y probar; actualizar la especificación si el alcance aprobado cambia.
6. Revisar que los criterios de aceptación y la trazabilidad estén completos antes de
   considerar terminada la funcionalidad.

## Cambios a esta constitución

Una modificación de estos principios debe explicitar el motivo y actualizar las
especificaciones o plantillas afectadas. No se deben cambiar requisitos de la cátedra por
decisión técnica local.
