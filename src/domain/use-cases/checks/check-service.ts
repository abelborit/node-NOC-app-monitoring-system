import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

/* puede o no puede venir el successCalback y errorCalback */
type SuccessCalback = (() => void) | undefined;
type ErrorCalback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  /* la inyección de dependencias se realiza en un constructor y si se está usando JavaScript puro entonces se podría hacer en un Factory Function donde el builder del factory recibe las dependencias y luego ya crea la función que ya viene con las dependencias inyectadas */
  constructor(
    /* se coloca como readonly porque no queremos cambiar accidentalmente successCalback y errorCalback en mi función execute */
    private readonly successCalback: SuccessCalback,
    private readonly errorCalback: ErrorCalback,
    /* casi siempre los casos de uso van a estar implementando o inyectando algún tipo de repositorio, no directamente trabajando con los datasources, sino mediante los repositorios. Sería "casos de uso -> repositorio -> datasource" */
    private readonly logRepository: LogRepository
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);

      if (!request.ok) throw new Error(`Error on check service ${url}`);

      const newLog = new LogEntity({
        severityLevel: LogSeverityLevel.low,
        message: `Service ${url} working!`,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(newLog);
      this.successCalback && this.successCalback();
      // console.log(`${url} is ok!✅`);

      return true;
    } catch (error) {
      const errorMessage = `${error} in ${url}`;
      const newLog = new LogEntity({
        severityLevel: LogSeverityLevel.high,
        message: errorMessage,
        origin: "check-service.ts",
      });
      this.logRepository.saveLog(newLog);
      // console.log(`${error}❌`);
      this.errorCalback && this.errorCalback(errorMessage);

      return false;
    }
  }
}
