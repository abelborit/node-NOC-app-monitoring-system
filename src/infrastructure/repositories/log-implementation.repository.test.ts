import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log-implementation.repository";

describe("Test in log-implementation.repository.ts", () => {
  const mockLogDatasouce = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImplementation(mockLogDatasouce);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    /* otra forma de crear un log y ya no creando una instancia del LogEntity como antes sino que algo (el objeto log) sea tratado como un LogEntity */
    const log = {
      severityLevel: LogSeverityLevel.high,
      message: "hola",
    } as LogEntity;

    await logRepository.saveLog(log);

    expect(mockLogDatasouce.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const lowSeverity = LogSeverityLevel.low;

    await logRepository.getLogs(lowSeverity);

    expect(mockLogDatasouce.getLogs).toHaveBeenCalledWith(lowSeverity);
  });
});
