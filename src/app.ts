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
const main = () => {
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
