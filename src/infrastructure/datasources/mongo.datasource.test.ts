import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoDatasource } from "./mongo.datasource";

describe("Test in mongo.datasource.ts", () => {
  const logDataSource = new MongoDatasource();

  const log = new LogEntity({
    severityLevel: LogSeverityLevel.medium,
    message: "test message",
    origin: "mongo.datasource.test.ts",
  });

  beforeAll(async () => {
    await MongoDataBase.connect({
      databaseName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany(); // para borrar todos los logs de la base de datos
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log"); // espiar el console.log que se tiene en mongo.datasource.ts porque como el caso de uso no regresa nada ni un true o false entonces se validará contra el console.log

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created✅:",
      expect.any(Object)
    );
  });

  test("should get all logs", async () => {
    /* para tener al menos dos logs creados para la prueba de get all logs porque si retorna un arreglo vacío no sería tan productiva esta prueba */
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(2);
    expect(logs[0].severityLevel).toBe(LogSeverityLevel.medium);
  });
});
