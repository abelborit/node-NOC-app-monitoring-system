import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo";
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

  // ServerApp.start();
};

(() => {
  main();
  // console.log(envs.PORT);
  // console.log(envs.MAILER_SERVICE);
  // console.log(envs.MAILER_EMAIL);
  // console.log(envs.MAILER_SECRET_KEY);
  // console.log(envs.PROD);
})();
