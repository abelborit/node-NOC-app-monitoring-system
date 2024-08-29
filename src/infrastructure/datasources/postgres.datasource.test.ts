import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresDatasource, prismaClient } from "./postgres.datasource";

/* se simula el cliente Prisma y su modelo logModel, de modo que podemos controlar el comportamiento de create y findMany en nuestras pruebas */
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      logModel: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    })),
    SeverityLevel: {
      LOW: "low",
      MEDIUM: "medium",
      HIGH: "high",
    },
  };
});

describe("Test in postgres.datasource.ts", () => {
  let datasource: PostgresDatasource;

  beforeAll(() => {
    datasource = new PostgresDatasource();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveLog", () => {
    it("should save a new log with the correct severity level", async () => {
      const logObject = new LogEntity({
        severityLevel: LogSeverityLevel.high,
        message: "Test log message 1",
        createdAt: new Date(),
        origin: "some-origin",
      });

      (
        prismaClient.logModel.create as jest.MockedFunction<
          typeof prismaClient.logModel.create
        >
      ).mockResolvedValueOnce(logObject as any);

      await datasource.saveLog(logObject);

      expect(prismaClient.logModel.create).toHaveBeenCalledWith({
        data: {
          ...logObject,
          severityLevel: "high", // El valor esperado basado en la conversión del enum
        },
      });

      expect(prismaClient.logModel.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("getLogs", () => {
    it("should return logs with the correct severity level", async () => {
      const logObject = new LogEntity({
        severityLevel: LogSeverityLevel.high,
        message: "Test log message 1",
        createdAt: new Date(),
        origin: "some-origin",
      });

      (
        prismaClient.logModel.findMany as jest.MockedFunction<
          typeof prismaClient.logModel.findMany
        >
      ).mockResolvedValueOnce([logObject as any]);

      const result = await datasource.getLogs(LogSeverityLevel.high);

      expect(prismaClient.logModel.findMany).toHaveBeenCalledWith({
        where: {
          severityLevel: "high", // El valor esperado basado en la conversión del enum
        },
      });

      expect(result).toEqual([LogEntity.fromObject(logObject)]);
    });
  });
});
