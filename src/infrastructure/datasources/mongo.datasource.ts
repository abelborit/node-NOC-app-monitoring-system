import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDatasource {
  async saveLog(newLog: LogEntity): Promise<void> {
    const createNewLog = await LogModel.create(newLog); // este no es una instancia de nuestra entidad LogEntity sino es una instancia de nuestro modelo de moongoose LogModel

    /* también se puede colocar este código para estar 100% seguros que se guarde en la base de datos, pero con el código anterior sería más que suficiente */
    // await createNewLog.save()
    console.log("Mongo Log created✅:", newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const getAllLogs = await LogModel.find({
      severityLevel: severityLevel,
    });

    /* si se quiere retornar los getAllLogs como "return getAllLogs;" nos dará un error porque los getAllLogs, que son un objeto, que es una colección de logs, no es una colección de nuestra entidad LogEntity, porque si se usa la entidad LogEntity que se definió para la aplicación para trabajar la data, entonces tiene que tener las propiedades y ser instancias del LogEntity y no se puede trabajar con los getAllLogs porque es muy propio de mongoose y mongo. Entonces vamos a tener que transformarlo */
    // return getAllLogs;

    return getAllLogs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
