/* el domain es donde rige todo el dominio de la empesa, van a ir las reglas de negocio de la empresa, cómo va a funcionar, los tipos de datos que vamos a tener */
/* la entity o models, se podría ver como lo que va a llegar a la base de datos */

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  /* aquí será nuestro sistema de log, vamos a tener lo que queremos registrar en la base de datos de nuestra aplicación */

  public severityLevel: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(levelSeverity: LogSeverityLevel, message: string) {
    this.severityLevel = levelSeverity;
    this.message = message;
    this.createdAt = new Date();
  }

  /* en base al dataAsAJSON que se le mande (que sería algo como "{ "severityLevel": "low", "message": "Hola Mundo", "createdAt": "8721398712930" }"), entonces puedo crear instancias de tipo LogEntity para obtener sus propiedades y hacer algo con ellas */
  static fromJSON = (dataAsAJSON: string): LogEntity => {
    const { severityLevel, message, createdAt } = JSON.parse(dataAsAJSON);

    // if (!severityLevel) throw new Error("severityLevel is required!");
    // if (!message) throw new Error("message is required!");
    // if (!createdAt) throw new Error("createdAt is required!");

    const newLog = new LogEntity(severityLevel, message);
    newLog.createdAt = new Date(createdAt); // crear la fecha basado en el string que viene de createdAt

    return newLog;
  };
}
