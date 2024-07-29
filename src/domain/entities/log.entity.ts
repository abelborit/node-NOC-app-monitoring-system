/* el domain es donde rige todo el dominio de la empesa, van a ir las reglas de negocio de la empresa, cómo va a funcionar, los tipos de datos que vamos a tener */
/* la entity o models, se podría ver como lo que va a llegar a la base de datos */

export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  severityLevel: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  /* aquí será nuestro sistema de log, vamos a tener lo que queremos registrar en la base de datos de nuestra aplicación */

  public severityLevel: LogSeverityLevel;
  public message: string;
  public origin: string; // archivo en el cual se llama a la clase LogEntity (para poder agregar más información al crear los logs y saber de dónde se está creando la nueva instancia)
  public createdAt: Date;

  constructor(logEntityOptions: LogEntityOptions) {
    const {
      severityLevel,
      message,
      origin,
      createdAt = new Date(),
    } = logEntityOptions;

    this.severityLevel = severityLevel;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  /* en base al dataAsAJSON que se le mande (que sería algo como "{ "severityLevel": "low", "message": "Hola Mundo", "createdAt": "8721398712930" }"), entonces puedo crear instancias de tipo LogEntity para obtener sus propiedades y hacer algo con ellas */
  static fromJSON = (dataAsAJSON: string): LogEntity => {
    const { severityLevel, message, createdAt, origin } =
      JSON.parse(dataAsAJSON);

    // if (!severityLevel) throw new Error("severityLevel is required!");
    // if (!message) throw new Error("message is required!");
    // if (!createdAt) throw new Error("createdAt is required!");

    const newLog = new LogEntity({
      severityLevel,
      message,
      createdAt,
      origin, // por ejemplo se podría colocar "log.entity.ts" u otro archivo en donde se llame la instancia de LogEntity
    });
    // newLog.createdAt = new Date(createdAt); // crear la fecha basado en el string que viene de createdAt. Se comenta porque ahora lo estamos mandando en la instancia de arriba

    return newLog;
  };
}
