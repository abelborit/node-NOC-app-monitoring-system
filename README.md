# NODE & TypeScript - NOC App (monitoring system)

---

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

1. En este proyecto se usará *ts-node-dev* en vez de *nodemon*. Recordar que si se trabaja con JavaScript entonces sí o sí sería trabajar con *nodemon* porque *ts-node-dev* es solo para TypeScript. Aquí se hace la variación a *ts-node-dev* para poder ver cómo funciona otro paquete de terceros.
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- ejemplo
- ejemplo
- ejemplo

### \* NOTAS:

- Al crear aplicaciones con arquitectura limpia ¿Lo recomendado es utilizar clases?

  - Cuando creamos aplicaciones con arquitectura limpia, se recomienda utilizar clases, y uno de los principales motivos para esto es debido a la inyección de dependencias. La inyección de dependencias es una técnica que ayuda a reducir el acoplamiento entre componentes en una aplicación. Permite desacoplar los componentes dependientes y hacer que el sistema sea más modular, flexible y fácil de probar.

  - Si bien es posible hacer inyección de dependencias en functional components, esto suele ser más complejo de implementar y mantener que con clases. Los functional components no tienen constructores y la inyección de dependencias a menudo se realiza a través de props, lo que puede complicar la gestión de las dependencias, especialmente en aplicaciones más grandes y complejas, se puede ver algunos ejemplos en el siguiente enlace: https://medium.com/@matthill8286/dependency-injection-in-react-a-good-guide-with-code-examples-4afc8adc6cdb

- La arquitectura limpia se enfoca en separar las diferentes capas de tu aplicación (entidades, casos de uso, presentación, bases de datos) para mantener un código limpio, modular y fácil de mantener.

- Los patrones de diseño son soluciones probadas a problemas comunes en el desarrollo de software.

---
