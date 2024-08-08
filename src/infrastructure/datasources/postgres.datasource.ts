import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

/* se crea este severityLevelEnum para que el severityLevel que se tiene que mandar sea igual al que se espera recibir en el archivo schema.prisma ya que por más que sean enum el de la entidad (log.entity.ts) no es el mismo tipo que el que tiene el schema (schema.prisma) y ahora ya se tendría una enumeración que viene de PostgreSQL */
const severityLevelEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresDatasource implements LogDatasource {
  async saveLog(newLog: LogEntity): Promise<void> {
    /* se realiza este logLevel y se manda esta data para que el severityLevel que se tiene que mandar sea igual al que se espera recibir en el archivo schema.prisma ya que por más que sean enum el de la entidad (log.entity.ts) no es el mismo tipo que el que tiene el schema (schema.prisma) y ahora ya se tendría una enumeración que viene de PostgreSQL */
    const logLevel = severityLevelEnum[newLog.severityLevel];

    const createNewLog = await prismaClient.logModel.create({
      data: {
        ...newLog,
        severityLevel: logLevel,
      },
    });

    console.log("PostgreSQL Log created✅:", createNewLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    /* se realiza este logLevel y se manda esta data para que el severityLevel que se tiene que mandar sea igual al que se espera recibir en el archivo schema.prisma ya que por más que sean enum el de la entidad (log.entity.ts) no es el mismo tipo que el que tiene el schema (schema.prisma) y ahora ya se tendría una enumeración que viene de PostgreSQL */
    const logLevel = severityLevelEnum[severityLevel];

    const getAllLogs = await prismaClient.logModel.findMany({
      where: {
        severityLevel: logLevel,
      },
    });

    /* aquí no se está regresando un entidad sino una serie de instancias que nos da nuestro Prisma Client que no está tan alejado de lo que es, es muy similar pero no se puede utilizar directamente en el código porque sería usar directamente la implementación que viene de la base de datos. Entonces ya se había hecho esa transformación usando el método fromObject */
    /* Lo que pasa es que cuando intentamos devolver el log directamente, estamos obteniendo un error porque estamos especificando que la función devuelve una instancia de LogEntity[], pero lo que obtenemos de la base de datos no es una instancia de LogEntity directamente. Por eso es que usamos el método .fromObject() que creamos para convertir ese objeto a una LogEntity y de esta manera se cumpla lo que definimos que se iba a devolver en el retorno de la función */
    // return getAllLogs;

    return getAllLogs.map((postgresLog) => LogEntity.fromObject(postgresLog));
  }
}
