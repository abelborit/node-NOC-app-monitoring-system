import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository {
  /* la idea de hacer esto es que aquí vamos a inyectar una dependencia importante la cual será el datasource el cual puede ser MongoDB, File System o cualquier otro, siempre y cuando se implementen los métodos que tiene el LogRepository */
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(newLog: LogEntity): Promise<void> {
    this.logDatasource.saveLog(newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
