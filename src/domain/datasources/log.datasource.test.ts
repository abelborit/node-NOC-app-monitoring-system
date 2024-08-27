import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

/* hacer test de clases abstractas porque no se pueden crear instancias de las clases abstractas. En este caso en las clases abstractas se está definiendo métodos con sus argumentos */
describe("Test in log.datasource.ts", () => {
  /* este newLog solo es para poder regresar algo en el getLogs, aunque en realidad no sería necesario pero igual se coloca como para tener algún log para regresar */
  const newLog = new LogEntity({
    origin: "log.datasource.test.ts",
    message: "test-message",
    severityLevel: LogSeverityLevel.low,
  });

  class MockLogDatasource implements LogDatasource {
    async saveLog(newLog: LogEntity): Promise<void> {
      /* aquí en realidad no importa qué es lo que hagan estos métodos, sino que se esté implementando el LogDatasource, por eso se está retornando algo X, no importa que no estén implementados los métodos en su totalidad pero sí que se esté implementando el LogDatasource, por eso, con que se regrese algo es más que suficiente */
      return;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      /* aquí en realidad no importa qué es lo que hagan estos métodos, sino que se esté implementando el LogDatasource, por eso se está retornando algo X, no importa que no estén implementados los métodos en su totalidad pero sí que se esté implementando el LogDatasource, por eso, con que se regrese algo es más que suficiente */
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    // const logDatasource = new LogDatasource(); // esto no se puede hacer porque no se puede crear una instancia de una clase abstracta pero para eso se puede preparar un mock
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe("function"); // evaluar si está definida y que es una función
    expect(typeof mockLogDatasource.getLogs).toBe("function"); // evaluar si está definida y que es una función

    /* probar los métodos y sus argumentos */
    await mockLogDatasource.saveLog(newLog);
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
