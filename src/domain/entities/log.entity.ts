/* el domain es donde rige todo el dominio de la empesa, van a ir las reglas de negocio de la empresa, cómo va a funcionar, los tipos de datos que vamos a tener */
/* la entity o models, se podría ver como lo que va a llegar a la base de datos */

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  /* aquí será nuestro sistema de log, vamos a tener lo que queremos registrar en la base de datos de nuestra aplicación */

  public levelSeverity: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(levelSeverity: LogSeverityLevel, message: string) {
    this.levelSeverity = levelSeverity;
    this.message = message;
    this.createdAt = new Date();
  }
}
