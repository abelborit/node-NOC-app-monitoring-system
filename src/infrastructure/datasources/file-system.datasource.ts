/* aquí ya estará la implementación del datasource, aquí ya sería el único lugar donde se llega directamente a la base de datos o file system, etc */
import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

/* normalmente se usa "extends" cuando una clase hereda de otra e "implements" cuando una clase implementa una interfaz, pero en este caso el LogDatasource es una clase abstracta, no una clase regular. Las clases abstractas son similares a las interfaces en que pueden declarar métodos sin implementarlos. Es simplemente una forma de asegurarse de que FileSystemDatasource implemente todos los métodos que LogDatasource declara que necesita */
export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly lowLogsPath = "logs/logs-low.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  /* para que cuando se mande a llamar la instancia de nuestra clase FileSystemDatasource entonces se creen los archivos si es que no existían */
  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    /* estoy creando un arreglo con los path que necesito */
    [
      this.allLogsPath,
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach((path) => {
      if (fs.existsSync(path)) return;

      fs.writeFileSync(path, "");
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const newLogAsJSON = `${JSON.stringify(newLog)}\n`;

    /* con el .appendFileSync() solo agrega una línea al final, no es necesario leer el archivo y luego agregar, solo agrega al final */
    fs.appendFileSync(this.allLogsPath, newLogAsJSON);

    if (newLog.severityLevel === LogSeverityLevel.low) {
      fs.appendFileSync(this.lowLogsPath, newLogAsJSON);
    } else if (newLog.severityLevel === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, newLogAsJSON);
    } else {
      fs.appendFileSync(this.highLogsPath, newLogAsJSON);
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
