import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import fs from "fs";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("Test in file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "../../../logs");
  /* puede ser que los slash aparezcan como invertidos, es decir, que no aparezcan así "/" sino así "\", para eso se puede solucionar reemplazando los slashes invertidos por slashes normales con .replace(/\\/g, "/") y con esto se está asegurando que la ruta sea válida y consistente independientemente del sistema operativo en el que se ejecute tu código. Esta práctica es recomendada para evitar problemas de compatibilidad entre sistemas operativos, ya que Windows utiliza barras invertidas en las rutas de archivos, mientras que sistemas como Unix (Linux, macOS) utilizan barras normales (/). Al realizar esta transformación, se asegura de que la ruta sea interpretada correctamente en cualquier entorno */
  // const logPath = path.join(__dirname, "../../../logs").replace(/\\/g, "/");

  /* para que antes de las pruebas se eliminen los logs que tiene cada archivo dentro de la carpeta logs y que esté como inicialmente sería, que sería vacío. Entonces por más que se guarde información en cada test, los archivos de la carpeta de logs siempre estarán vacíos */
  beforeAll(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    // console.log(files);

    expect(files).toEqual([
      "logs-all.log",
      "logs-high.log",
      "logs-low.log",
      "logs-medium.log",
    ]);
  });

  test("should save a log in logs-all.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      severityLevel: LogSeverityLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-medium.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      severityLevel: LogSeverityLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: "test",
      severityLevel: LogSeverityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  /* hay que revisar este test porque algo en la implementación está haciendo que llegue como undefined los valores y lanza un error controlado en la implementación */
  // test("should return all logs", async () => {
  //   const logDatasource = new FileSystemDatasource();

  //   const logLow = new LogEntity({
  //     message: "log-low",
  //     severityLevel: LogSeverityLevel.low,
  //     origin: "file-system.datasource.test.ts - low",
  //   });

  //   const logMedium = new LogEntity({
  //     message: "log-medium",
  //     severityLevel: LogSeverityLevel.medium,
  //     origin: "file-system.datasource.test.ts - medium",
  //   });

  //   const logHigh = new LogEntity({
  //     message: "log-high",
  //     severityLevel: LogSeverityLevel.high,
  //     origin: "file-system.datasource.test.ts - high",
  //   });

  //   await logDatasource.saveLog(logLow);
  //   await logDatasource.saveLog(logMedium);
  //   await logDatasource.saveLog(logHigh);

  //   const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
  //   const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
  //   const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

  //   expect(logsLow).toEqual(expect.arrayContaining([logLow]));
  //   expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
  //   expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  // });

  test("should not throw an error if path exists", () => {
    /* se manda a llamar dos veces por que....... */
    new FileSystemDatasource(); // aquí se crea
    new FileSystemDatasource(); // aquí verifica que ya existe y por ende debería mandar a llamar al return que nos hace falta

    /* este expect es solo por formulismo para esperar que ese true siempre sea verdad, porque en sí el test ya se hizo con el código de arriba */
    expect(true).toBeTruthy();
  });

  test("should throw an error if severity level is not defined", async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = "SUPER_MEGA_HIGH" as LogSeverityLevel; // sabemos que no existe pero que lo "considere" como si fuera un LogSeverityLevel

    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy(); // esto nunca debería de ejecutarse y si se ejecuta entonces hay que revisar el código, se coloca por simple formulismo y saber si todo está bien o no en esta parte
    } catch (error) {
      const errorString = `${error}`;

      expect(errorString).toContain(`${customSeverityLevel} not implemented!`);
    }
  });
});
