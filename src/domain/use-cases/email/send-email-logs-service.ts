import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsServiceUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogsService implements SendEmailLogsServiceUseCase {
  /* normalmente son nuestros casos de uso quienes llaman a nuestro repository */
  /* NOTA: En el constructor se hace inyección de dependencias del EmailService que está en la capa de presentación. ¿Esto es completamente válido? Ya que se está haciendo uso de una capa externa, ¿O lo ideal sería implementar un EmailRepository? ¡No debería!, efectivamente sería mejor crear un repository, o en su defecto en config, un par de funciones que hagan el envío del correo */
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sentInfo = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sentInfo) {
        throw new Error("Email log not sent!❌");
      }

      const log = new LogEntity({
        severityLevel: LogSeverityLevel.low,
        message: "Email sent!✅",
        origin: "send-email-logs-service.ts",
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      console.log(error);

      const log = new LogEntity({
        severityLevel: LogSeverityLevel.high,
        message: `Email not sent - ${error}❌`,
        origin: "send-email-logs-service.ts",
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }
}
