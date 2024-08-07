import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/serverApp";
// import { envs } from "./config/plugins/envs.plugin";

/* Classic Form */
/* (() => {
  main();
})();

function main() {
  ServerApp.start();
} */

/* Arrow Function */
const main = async () => {
  /* antes de ejecutar el servidor podemos asegurarnos de tener la conexión a la base de datos */
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    databaseName: envs.MONGO_DB_NAME,
  });

  /* al colocar en la terminal el comando de "npx prisma migrate dev --name init" nos creó este cliente y ahí está toda la configuración basada en el esquema que nosotros hemos definido lo cual ya sabe todos los objetos que están internamente */
  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Test message from Prisma",
  //     origin: "app.ts",
  //     severityLevel: "LOW",
  //   },
  // });
  // console.log(newLog);

  // const getLogs = await prisma.logModel.findMany();
  // console.log(getLogs);

  // const getLogs = await prisma.logModel.findMany({
  //   where: {
  //     severityLevel: "HIGH",
  //   },
  // });
  // console.log(getLogs);

  /* crear un documento/registro en una colección/tabla que en mongo una colección = tablas de base de datos relacionales y los documentos = registros en una base de datos relacional */
  /* trabajar con el modelo de LogModel al momento de hacer inserciones en nuestra base de datos, que sería una colección de Logs */
  // const newLog = await LogModel.create({
  //   message: "Test message from mongoose - 2",
  //   origin: "app.ts",
  //   severityLevel: "low",
  // });

  // await newLog.save()
  // console.log(newLog);

  /* obtener los logs desde mongo */
  // const getLogs = await LogModel.find();
  // console.log(getLogs);

  ServerApp.start();
};

(() => {
  main();
  // console.log(envs.PORT);
  // console.log(envs.MAILER_SERVICE);
  // console.log(envs.MAILER_EMAIL);
  // console.log(envs.MAILER_SECRET_KEY);
  // console.log(envs.PROD);
})();
