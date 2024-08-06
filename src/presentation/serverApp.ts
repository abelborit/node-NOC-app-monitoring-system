import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogsService } from "../domain/use-cases/email/send-email-logs-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log-implementation.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const LogRepository = new LogRepositoryImplementation(
  // new FileSystemDatasource()
  new MongoDatasource()
);

/* ya no sería necesario mandarle nuestro repository aquí porque nuestro EmailService solo mandará nuestro email y nada más y nuestro caso de uso será quien lo haga ya que ahí se manda el repository */
const emailService = new EmailService();

export class ServerApp {
  constructor() {}

  /* nivel de acceso (public / private) en la programación con clases o en la POO (Programación Orientda a Objetos) */
  public static start() {
    console.log("Server running...✅");

    /* -- MANDAR EMAIL -- */
    /* mandar correos con nuestro use case para emails */
    /* se comenta para no generar ruido en la terminal */
    // new SendEmailLogsService(emailService, LogRepository).execute([
    //   "", // correo 1
    //   "", // correo 2
    // ]);

    // emailService.sendEmail({
    //   to: "",
    //   subject: "Logs del servidor",
    //   htmlBody: `<h3>Logs del Sistema - NOC</h3>
    //   <p>Texto de prueba</p>
    //   <p>Ver logs adjuntos</p>`,
    // });

    // emailService.sendEmailWithFileSystemLogs(["", ""]);

    /* -- TAREA DE LOS LOGS -- */
    /* se comenta para no generar ruido en la terminal */
    /* cada 3 segundos */
    CronService.createJob("*/3 * * * * *", () => {
      // const date = new Date();
      // console.log("Every 3 seconds", date);

      const url = "http://google.com";
      // const url = "http://localhost:3000/posts";

      new CheckService(
        () => console.log(`Dependencies Injection: ${url} is ok!✅`), // undefined
        (error) => console.log(`Dependencies Injection: ${error}❌`), // undefined
        LogRepository
      ).execute(url);

      // new CheckService(
      //   undefined, // () => console.log(`Dependencies Injection: ${url} is ok!✅`)
      //   undefined, // (error) => console.log(`Dependencies Injection: ${error}❌`)
      //   LogRepository
      // ).execute(url);
    });
  }
}
