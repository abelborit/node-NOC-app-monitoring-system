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

  test("should create a LogEntity instance from object", () => {
    const newLog = LogEntity.fromObject(fakeLogData);

    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.message).toBe(fakeLogData.message);
    expect(newLog.severityLevel).toBe(fakeLogData.severityLevel);
    expect(newLog.origin).toBe(fakeLogData.origin);
    expect(newLog.createdAt).toBeInstanceOf(Date);
  });
});
