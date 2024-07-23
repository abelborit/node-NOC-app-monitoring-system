import { ServerApp } from "./presentation/serverApp";


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
})();
