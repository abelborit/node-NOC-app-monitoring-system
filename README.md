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

- Paquete `dotenv` usando `npm i dotenv` desde `https://www.npmjs.com/package/dotenv` para leer las variables de entorno
- Paquete `env-var` usando `npm i env-var` desde `https://www.npmjs.com/package/env-var` para hacer validaciones de nuestras variables o qué tipo de dato van a regresar (string, number, etc)
- ejemplo
- ejemplo

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---

## Parte III:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección aprenderemos a enviar correos electrónicos con y sin archivos adjuntos para Gmail y NodeMailer. Al final de esta parte, se podrá enviar correos electrónicos programados con la información que se necesita.

- Puntualmente veremos:

  - Casos de Uso
  - Servicios
  - Inyecciones de dependencias
  - Configuración de password en Gmail (secret keys)
  - NodeMailer (paquete de terceros para mandar correos certificados)
  - SMTP (Simple Mail Transfer Protocol - Protocolo Simple de Transferencia de Correo)
    - Para poder mandar correos certificados y que no vayan a la bandeja de SPAM

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nodemailer` usando `npm i nodemailer` desde `https://www.npmjs.com/package/nodemailer` y su página oficial `https://nodemailer.com/about/` para mandar un correo autenticado desde nuestra cuenta de gmail

  - Para el archivo de definición de TypeScript `npm i --save-dev @types/nodemailer`

    - Por si hay algún error referente al enviar mail por falta de host, entonces se puede agregar:

      ```javascript
        private transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          service: envs.MAILER_SERVICE,
          auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
          },
        });
      ```

    - Para enviar archivos adjuntos o attachments `https://nodemailer.com/message/attachments/`

    - Ejemplo de envío de emails en Node JS usando Nodemailer y Outlook: `https://www.youtube.com/watch?v=OuYHrVMcuCU`

- ejemplo
- ejemplo

### \* NOTAS:

- Para este ejercicio se podría usar nuestra cuenta de gmail y evitar hacer algún pago y aquí nosotros queremos mandar un correo autenticado desde nuestra cuenta de gmail pero desde esta aplicación de node y así podemos crear un nuevo correo de gmail y usarlo para el envío de estos correos electrónicos automatizados. Para hacer eso hay que hacer unas configuraciones que es para las contraseñas y unas políticas de seguridad de nuestra cuenta de gmail, no es complicado pero hay que hacerlas en orden para poder usar `nodemailer` y también estamos usando las variables de entorno para poder hacer un poco más segura nuestra aplicación y datos sensibles.

  - Para la verificación en dos pasos: https://myaccount.google.com/security

  - Para establecer un nivel de acceso a nuestra aplicación: https://myaccount.google.com/u/0/apppasswords la cual se colocará en las variables de entorno en _MAILER_SECRET_KEY_

- ejemplo
- ejemplo

---

# Resumen de lo visto anteriormente:

- Nuestro app.ts tiene la función anónima autoinvocada y es el inicio de nuestra aplicación.

- La estructura de nuestro directorio es con la siguiente idea:

  - `config` objetos globales o básicamente configuraciones globales, si se hacen llamadas HTTP entonces ahí se podrían colocar, etc.

  - `domain` son las reglas con las cuales van a regir mi aplicación a un nivel macro, alejándose del frontend o capas más externas. En este caso, esta capa domain tendrá:

    - `datasources` (orígenes de datos o bases de datos)
    - `entities` (entidades que se apegan más a las bases de datos)
    - `repository` (repositorio que es la forma en cómo quiero trabajar con los datasources o bases de datos)
    - `use-cases` (casos de uso)

  - `infrastructure` es donde ya están nuestras implementaciones de nuestro repository y datasources. En el datasources es donde literalmente hacemos el trabajo de unir nuestro origen de datos, procesándolo, recuperando información, etc. En los repositories trabajan con el datasources y aquí nos permite cambiar el datasource y poder interactuar con él.

  - `presentation` es lo que está más cerca a lo que el usuario puede ver como por ejemplo aplicaciones de consola, etc. Aquí en "email.service.ts" pareciera que no tiene dependencias pero sí tiene una que es llamada _dependencia oculta_ porque por más que no se le esté inyectando una dependencia directa en el constructor, en ese archivo podemos ver que hace uso de las variables de entorno y esas se están importando porque son datos que se necesitan enviar y si no se envían entonces dará un error, entonces se puede realizar una inyección de esas variables para tenerlo de forma explícita y ya no como _dependencia oculta_ sino una explícita que sí o sí se tiene que envíar.
