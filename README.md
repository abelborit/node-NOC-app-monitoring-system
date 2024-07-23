# NODE & TypeScript - NOC App (monitoring system)

---

## Parte I:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección se explicará de forma global el objetivo de la creación de este sistema de monitoreo/notificaciones conocido como NOC (Network Operation Center) el cual se le crearán procedimientos (códigos) para estarlos ejecutando en momentos específicos (por hora, al final del día, todos los lunes, etc...) En cuanto a los procedimientos pueden ser por ejemplo estar pendiente de la base de datos, revisar si se pueden hacer aserciones, revisar algún endpoint, problemas en el sistema de autenticación, etc

Esta aplicación vamos a hacerla para que monitoree un API, lo vamos a bajar y subir y eso empezará a crear logs de los sucesos y cada log que vamos a estar creando irán a diferentes data sources o destinos donde vamos a guardar esa información. También se mandarán correos electrónicos con los sucesos/acontecimientos, HTML, texto plano, con attachments (archivos adjuntos) para poder abrirlos en nuestro celular o tomar decisiones.

Los data sources que manejaremos para grabar los logs son File System, MongoDB, PostgreSQL.

- En cuanto a la Clean Architecture aplicada a este ejercicios veremos:

  - Entities (entidades)

    - LogEntity: podría ser una representación de lo que vamos a colocar en la base de datos
      - Nivel de severidad
      - Mensaje del suceso
      - ¿Cuándo pasó?

  - Use Cases (casos de uso)

    - Grabar los logs
    - Leer logs por nivel de severidad
    - Enviar email

  - Presenters (presentación)

    - Resultado en la consola (aplicación de consola)

  - Data Base (base de datos)

    - File System
    - MongoDB
    - PostgreSQL

- Algunas consideraciones a tener en cuenta:

  - No debería afectar si:
    - Cambiamos la base de datos
    - Queremos trabajar con múltiples orígenes de datos (bases de datos)
    - Cambiamos el motor de correos
    - Añadimos o quitamos tareas (casos de uso)

- Puntualmente veremos:

  - Introducción a la Arquitectura Limpia (Clean Architecture)
  - Repository Pattern
  - Introducción a la inyección de dependencias (DI - Dependency injection)
  - JSON-Server
  - Casos de Uso
  - CRON Task - Tareas cronometradas

### \* PASOS A REALIZAR:

1. En este proyecto se usará _ts-node-dev_ en vez de _nodemon_. Recordar que si se trabaja con JavaScript entonces sí o sí sería trabajar con _nodemon_ porque _ts-node-dev_ es solo para TypeScript. Aquí se hace la variación a _ts-node-dev_ para poder ver cómo funciona otro paquete de terceros.
2. Para levantar el servidor con la data colocar en una terminal `npm run server:data` y para levantar el proyecto colocar en otra terminal `npm run dev`
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `cron` usando `npm i cron` desde `https://www.npmjs.com/package/cron`
- Paquete `json-server` usando `npm install json-server@0.17.3` desde `https://www.npmjs.com/package/json-server`
- ejemplo

### \* NOTAS:

- Al crear aplicaciones con arquitectura limpia ¿Lo recomendado es utilizar clases?

  - Cuando creamos aplicaciones con arquitectura limpia, se recomienda utilizar clases, y uno de los principales motivos para esto es debido a la inyección de dependencias. La inyección de dependencias es una técnica que ayuda a reducir el acoplamiento entre componentes en una aplicación. Permite desacoplar los componentes dependientes y hacer que el sistema sea más modular, flexible y fácil de probar.

  - Si bien es posible hacer inyección de dependencias en functional components, esto suele ser más complejo de implementar y mantener que con clases. Los functional components no tienen constructores y la inyección de dependencias a menudo se realiza a través de props, lo que puede complicar la gestión de las dependencias, especialmente en aplicaciones más grandes y complejas, se puede ver algunos ejemplos en el siguiente enlace: https://medium.com/@matthill8286/dependency-injection-in-react-a-good-guide-with-code-examples-4afc8adc6cdb

- La arquitectura limpia se enfoca en separar las diferentes capas de tu aplicación (entidades, casos de uso, presentación, bases de datos) para mantener un código limpio, modular y fácil de mantener.

- Los patrones de diseño son soluciones probadas a problemas comunes en el desarrollo de software.

- Cuando hablamos de la capa de "presentación" o "presentation" ¿Podríamos hacer un simil a lo que sería la vista en la conocida arquitectura MVC? Digamos que en el backend la vista en el MVC puede ser un json, un pdf, una imagen, un archivo de texto plano, html, etc. ¿Cierto? Cualquier representación "gráfica" de los datos. ¿Verdad?

  - Sí, la capa de presentación en la arquitectura limpia es similar a la vista en la arquitectura MVC. La capa de presentación es responsable de dar forma y estructura a los datos que se van a presentar al usuario, de manera similar a como la vista en MVC se encarga de renderizar los datos en una representación visual.

  - En la arquitectura limpia, la capa de presentación se encarga de transformar los datos brutos que se reciben del backend en una representación visual o interactiva que el usuario pueda entender y trabajar. Esta capa se encarga de la lógica de presentación, como la estructura de la interfaz de usuario, la layouter de los elementos en la pantalla, el estilo y la forma en que se presentan los datos.

  - En cuanto a la comparación con la vista en MVC, sí, la capa de presentación en la arquitectura limpia es un símil a la vista en MVC. La vista en MVC es la capa que se encarga de renderizar los datos en una representación visual, y en la arquitectura limpia, la capa de presentación tiene una función similar, ya que se encarga de dar forma y estructura a los datos para su presentación al usuario.

---

## Parte II:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección trabajaremos con el patron "Repository" para poder construir una forma intercambiable de orígenes de datos. Aquí veremos la configuración de variables de entorno, las cuales nos permite cambiar la aplicación si estamos en producción, staging, testing o development.

- Puntualmente veremos:

  - Entidades
  - DataSources
  - Repositorios
  - Clases Abstractas
  - Implementaciones
  - Variables de entorno
  - Validación de variables de entorno.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- ejemplo
- ejemplo
- ejemplo

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---
