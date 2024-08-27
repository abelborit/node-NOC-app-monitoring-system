import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("Test in log.entity.ts", () => {
  const fakeLogData = {
    message: "Hola Mundo",
    severityLevel: LogSeverityLevel.high,
    origin: "log.entity.test.ts",
  };

  test("should create a LogEntity instance", () => {
    const newLog = new LogEntity(fakeLogData);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(fakeLogData.message);
    expect(newLog.severityLevel).toBe(fakeLogData.severityLevel);
    expect(newLog.origin).toBe(fakeLogData.origin);
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from JSON", () => {
    /* se sacó un log de los logs que se tienen en logs-all.log */
    const logAsJSON = `{"severityLevel":"low","message":"Service http://google.com working!","origin":"check-service.ts","createdAt":"2024-08-06T22:24:54.157Z"}`;

    const newLog = LogEntity.fromJSON(logAsJSON);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe("Service http://google.com working!");
    expect(newLog.severityLevel).toBe(LogSeverityLevel.low);
    expect(newLog.origin).toBe("check-service.ts");
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  test("should throw an error if message is missing from JSON", () => {
    /* se sacó un log de los logs que se tienen en logs-all.log */
    const logAsJSON = `{"severityLevel":"low","origin":"check-service.ts","createdAt":"2024-08-06T22:24:54.157Z"}`;

    /* las pruebas que lanzan errores aquí se está usando una función de callback lo cual asegura que el error se lance como se esperaba */
    /* En las pruebas unitarias en JavaScript (y en otros lenguajes), cuando se desea verificar que una función lanza un error, se debe envolver la llamada a la función en una función de callback. Esto es necesario para capturar el error y compararlo con el mensaje o tipo de error esperado. Aquí asegura que LogEntity.fromJSON(logAsJSON) se ejecute dentro del callback, permitiendo que Jest capture y compare el error lanzado. Si no se coloca dentro de un callback entonces se ejecutará inmediatamente al evaluar la expectativa, lanzando el error antes de que Jest tenga la oportunidad de realizar la aserción. Esto causará que la prueba falle inmediatamente, sin tener la oportunidad de verificar el mensaje del error o capturarlo correctamente */
    /* En los frameworks de pruebas como Jest, expect().toThrow() se utiliza para comprobar si una función lanza un error. Para que esta aserción funcione correctamente, se necesita pasar una función que llame al código que se espera que lance el error. Si no se envuelve la llamada en una función, la prueba no puede detectar el error correctamente porque el error se lanzaría inmediatamente al momento de evaluación de la expectativa, en lugar de durante la ejecución de la función */
    expect(() => LogEntity.fromJSON(logAsJSON)).toThrow("message is required!");
  });

  test("should create a LogEntity instance from object", () => {
    const newLog = LogEntity.fromObject(fakeLogData);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(fakeLogData.message);
    expect(newLog.severityLevel).toBe(fakeLogData.severityLevel);
    expect(newLog.origin).toBe(fakeLogData.origin);
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });

  test("should throw an error if severityLevel is missing from object", () => {
    const fakeLogDataWithoutSeverity = {
      message: "Hola Mundo",
      origin: "log.entity.test.ts",
    };

    expect(() => LogEntity.fromObject(fakeLogDataWithoutSeverity)).toThrow(
      "severityLevel is required!"
    );
  });
});
