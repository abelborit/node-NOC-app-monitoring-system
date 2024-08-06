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

  - `infrastructure` es donde ya están nuestras implementaciones de nuestro repository y datasources. En el datasources es donde literalmente hacemos el trabajo de unir nuestro origen de datos, procesándolo, recuperando y ahí veremos muchos logs, que son todas las instancias y configuraciones necesarias que creó dockerrando y dentro de todo eso veremos un mensaje similar a "Waiting for connections..." información, etc. En los repositories trabajan con el datasources y aquí nos permite cambiar el datasource y poder interactuar con él.

  - `presentation` es lo que está más cerca a lo que el usuario puede ver como por ejemplo aplicaciones de consola, etc. Aquí en "email.service.ts" pareciera que no tiene dependencias pero sí tiene una que es llamada _dependencia oculta_ porque por más que no se le esté inyectando una dependencia directa en el constructor, en ese archivo podemos ver que hace uso de las variables de entorno y esas se están importando porque son datos que se necesitan enviar y si no se envían entonces dará un error, entonces se puede realizar una inyección de esas variables para tenerlo de forma explícita y ya no como _dependencia oculta_ sino una explícita que sí o sí se tiene que envíar.

---

## Parte IV:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Esta sección es para integrar las bases de datos MongoDB y PostgreSQL en nuestra aplicación de monitoreo - NOC.

- Puntualmente veremos:

  - Mongoose
  - Prisma
  - TypeORM (ahí veremos muchos logs, que son todas las instancias y configuraciones necesarias que creó docker oficialmente y dentro de todo eso veremos un mensaje similar a "Waiting for connections...")
  - Migraciones de prisma
  - Insertar en base de datos
  - Leer de base de datos
  - Mapeo de data a Entidades
  - Creación de datasources
  - Caso de uso nuevo, para grabar en múltiples destinos simultáneamente

### \* PASOS A REALIZAR:

- Necesarias:

  1. Se necesita tener instalado [MongoDB Compass](https://www.mongodb.com/try/download/compass)
  2. Se necesita tener instalado [Docker Desktop](https://www.docker.com/get-started/)

- Extensiones de VSCode (Instalaciones adicionales)

  1. Se necesita tener instalado [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  2. Se necesita tener instalado [Better DockerFile Syntax](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-dockerfile-syntax)
  3. Se necesita tener instalado [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

- Una forma facil de levantar una imagen de mongo en docker o utilizar una imagen y colocarla en un contenedor (por si no se tiene experiencia directa utilizando docker y contenedores) es crear un file `docker-compose.yml` para seguir unas instrucciones:

  ```docker
  version: '3.8' // versión de docker

  services: // servicios que quiero correr
    mongo-db: // nombre del servicio que queremos crear
      image: mongo:6.0.6 // versión de la imagen que quiero utilizar (podemos pasarnos a la imagen versión 4 o 5 o X sin pasar por todo el proceso engorroso de reinstalarlo en la computadora)
      restart: always // cuando nuestro docker desktop se levante, inmediatamente va a levantar esta imagen
      environment: // variables de entorno, que son configuraciones por defecto para que la imagen de mongodb tenga cuando se levante. Esa configuración también las colocamos en los files .env porque los archivos docker-compose.yml leen por defecto los archivos .env
        MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER} // config de variables de entorno sacadas de https://hub.docker.com/_/mongo y para usar nuestras variables de entorno se usa con ${......}
        MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS} // config de variables de entorno sacadas de https://hub.docker.com/_/mongo y para usar nuestras variables de entorno se usa con ${......}
      volumes: // para tener la data que se va creando en un lugar aparte porque si no se tiene los volumenes entonces al eliminar nuestro contenedor junto con la imagen, entonces se perdería toda la data que se grabó en nuestra base de datos
        - ./mongo:/data/db // grabar la información que vamos guardando en una ruta que nosotros coloquemos. En este caso se creará una carpeta mongo en nuestro file system y todo lo que se graben en /data/db se grabará también en nuestra carpeta mongo de nuestro file system
      ports: // abrir nuestro contenedor en un puerto. Es la forma en cómo nos vamos a comunicar desde el mundo exterior a nuestro contenedor, lo cual lo hace bien hermético ya que si solo hay un puerto abierto entonces solo por ese puerto se puede comunicar
        - 27017:27017 // puerto para la comunicación. El puerto por defecto de mongodb es el 27017. Entonces vamos a mapear el puerto 27017 de nuestra computadora para mapear : con el puerto 27017 de la imagen que usa mongodb de nuestro contenedor, puede ser también por ejemplo 27018:27017 o #####:27017
  ```

- Abrir una terminal aparte y confirmar que tenemos docker instalado usando `docker --version`.
- Luego, docker desktop instala también el docker compose, entonces colocamos `docker compose up` y ahí veremos muchos logs, que son todas las instancias y configuraciones necesarias que creó docker y dentro de todo eso veremos un mensaje similar a "Waiting for connections..." y si abrimos docker desktop entonces veremos nuestro juego de contenedores y ahí dentro está el que nosotros creamos el servicio con el nombre de `mongo-db` y veremos como `mongo-db-x` y esa -x será el número que tenemos, porque se pueden crear varias réplicas, ahí también veremos la versión de la imagen, el puerto que está mapeando, etc.
- Al hacer lo anterior entonces es medio tedioso tener una terminal abierta aparte y luego el docker desktop también porque se tiene que levantar y luego cerrar con `ctrl + c` y así sucesivamente, entonces podemos utilizar el comando `docker compose up -d` o `docker compose up --detach` lo que significa que todo va a correr pero desligado de esa terminal, lo que quiere decir que ya se puede cerrar esa terminal y nuestro docker sigue corriendo.
- Ahora, abrir MongoDB Compass y si intentamos conectarnos directamente usando lo que nos viene por defecto `mongodb://localhost:27017` entonces nos saldría un error porque nosotros configuramos variables de entorno. NOTA: si nosotros configuramos por ejemplo 27058:27017 entonces en la url iría `mongodb://localhost:27058`. PAra solucionar lo del error mencionado, ir a Advanced Connection Options -> Authentication -> Username/Password y ahí colocaremos lo que configuramos en nuestras variables de entorno -> Save & Connect y colocar por ejemplo "NOC-App-MongoDB"

### \* RECURSOS A USAR:

- Imagen de mongo: https://hub.docker.com/_/mongo
- ejemplo
- ejemplo

### \* NOTAS:

- Se puede obviar el usar `Docker Desktop` pero es más facil usar y montar una base de datos MongoDB ahí, es más facil probar, deshacer, borrar la base de datos, volver a levantar y tener todo el ambiente de desarrollo sin que salga de nuestra computadora. Al usar docker en nuestro ambiente de desarrollo, nos va a poder permitir tener nuestra base de datos rápidamente en nuestro equipo sin pasar por todo el proceso de instalación manual. Alguans referencias:

  - https://www.youtube.com/watch?v=eKXIxSZrJfw&t=2s
  - https://www.youtube.com/watch?v=NVvZNmfqg6M
  - https://www.youtube.com/watch?v=lzRY5Z59Bso
  - https://www.youtube.com/watch?v=w1v6DspnUBQ

  - Algunos comandos de Docker:

    - `docker images` -> listar las imágenes que tengo instaladas en mi computadora usando docker
    - `docker run nombre_imagen` -> generar un contenedor de una imagen
      - NOTA: en el caso de mongo, se ejecuta un contenedor e inicia la base de datos pero como se está ejecutando desde un contenedor, este internamente tiene su configuración y aunque la base de datos se esté ejecutando no podemos acceder a ella ya que el contender no está haciendo público los puertos que utiliza, y ahí también podemos ver que mongodb ya está listo para recibir conexiones porque nos muestra un mensaje similar a "Waiting for connections on port 27017" y entonces tenemos que conectarnos a esa base de datos que está dentro de un contenedor y para eso hay que configurar algunas cosas. Por mientras presionamos "ctrl + c" para salir de ese proceso
    - `docker ps` -> listar los contenedores generados activos (es como el historial de procesos que estamos ejecutando)
    - `docker ps -a` -> listar los contenedores generados (es como el historial de procesos que hemos ejecutado)
    - `docker run -p 27017:27017 --name mydatabase mongo` -> acceder a la instancia de nuestro contenedor de mongo usando docker
      - El "-p" es para el puerto donde se está ejecutando el contenedor. Cuando ejecutamos una instancia de mongodb por defecto esta escucha en el puerto 27017 pero como está dentro de un contenedor entonces tengo que exponerlo hacia nuestra computadora donde estamos trabajando, es decir, ese puerto 27017 está de forma interna en el contenedor, si queremos acceder a ese puerto se le coloca "27017:27017" que significa que le estamos dando el puerto donde voy a conectarme en esta computadora. Es decir, se le está diciendo que queremos que se conecte a través del puerto 27017 en esta computadora donde el puerto 27017 se conectará al puerto 27017 interno del contenedor. Puede ser cualquier puerto como por ejemplo 27018:27017 o 2015:27017, etc...
      - El "--name" es para darle el nombre a la instancia (el nombre de este proceso), que por ejemplor puede ser mydatabase
    - `docker run -d -p 27017:27017 --name mydatabase mongo` -> acceder a la instancia de nuestro contenedor de mongo usando docker
      - El "-d" es detach, que quiere decir que cuando se ejecute ese comando solo me dará el id del proceso y ya se puede cerrar la terminal ya que se estará ejecutando como en segundo plano, como que en un proceso de docker y ya no es necesario tener la terminal abierta
    - - `docker run -d -p 27017:27017 -v nombre_carpeta:/data/db  --name mydatabase mongo` -> lo mismo que lo anterior pero la opción "-v" va a tomar dos rutas, la ruta actual donde se quiere guardar los datos en la computadora y la ruta donde va a estar funcionando el contenedor que mongodb guarda su configuraciòn en `/data/db` lo cual este comando puede ser tanto para llevar datos de mongo a nuestra computadora como para llevar de nuestra computadora a mongo. Guardar datos en nuestra computadora que han sido creados en instancias o contenedores de mongodb. En docker existen los "volumenes" que son prácticamente el poder alterar datos en el contenedor y que estos se vean reflejados en la computadora host (nuestra computadora donde ejecutamos docker)
    - `docker stop id_contenedor` -> para la ejecución de un contenedor (se le puede pasar el id del contenedor o sino el nombre de la instancia que hemos creado. Si se le pasa el id, como es muy largo se puede pasar solo los primeros caracteres) pero aunque se pare su ejecución, el contenedor se queda registrado
    - `docker rm id_contenedor` -> eliminar un contenedor creado en base a su id
      - `docker rm id_contenedor -f` -> eliminar un contenedor creado en base a su id de manera forzada (si aún no se detuvo ese contenedor pero igual se quiere eliminar)
    - `docker rm $(docker ps -aq)` -> eliminar todos los contenedores creados
      - El "docker ps -aq" me devuelve todos los id de los contenedores que tengo creados

  - Con lo anterior se creó un contenedor de mongodb, es decir, no se tiene instalado mongodb en la computadora, entonces para eso se necesita un programa que me permita conectarme a esa base de datos de mongodb, como por ejemplo usar `mongo compass` que es una interface gráfica o sino instalar un cliente de mongodb (en linux es facil instalarlo porque en linux hay un cliente llamado `mongo client`). Todo esto es para ver si se puede conectar a la instacia de mongodb creada anteriormente y si se conecta entonces quiere decir que todo está bien.

  - Algunos comandos de MongoDB:

    - `show dbs` -> mostrar las bases de datos de mongodb (admin, config y local son las que están por defecto)ç
    - `use nombre_base_datos` -> crear una base de datos
    - `db.nombre_coleccion.insert(opciones_a_colocar)` -> insertar un dato en nuestra base de datos
    - `show collections` -> listar las colecciones creadas
    - `db.nombre_coleccion.find()` -> listar lo que tengo dentro de la colección

- ejemplo
- ejemplo

---
