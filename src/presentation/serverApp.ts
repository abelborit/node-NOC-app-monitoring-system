import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  constructor() {}

  /* nivel de acceso (public / private) en la programación con clases o en la POO (Programación Orientda a Objetos) */
  public static start() {
    console.log("Server running...✅");

    /* cada 3 segundos */
    CronService.createJob("*/3 * * * * *", () => {
      // const date = new Date();
      // console.log("Every 3 seconds", date);

      const url = "http://google.com";
      // const url = "http://localhost:3000/posts"

      new CheckService(
        () => console.log(`Dependencies Injection: ${url} is ok!✅`),
        (error) => console.log(`Dependencies Injection: ${error}❌`)
      ).execute(url);
    });
  }
}
