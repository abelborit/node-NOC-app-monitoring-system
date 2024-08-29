import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogsService } from "./send-email-logs-service";

describe("Test in send-email-logs-service.ts", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogsService(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmail and saveLog with success", async () => {
    const result = await sendEmailLogs.execute("fernando@google.com"); // forma como string
    // const result = await sendEmailLogs.execute(["'fernando@google.com'"]); // forma como arreglo de string

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: "Email sent!✅",
      origin: "send-email-logs-service.ts",
      severityLevel: "low",
    });
  });

  test("should call sendEmail and saveLog with error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("fernando@google.com");

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: "Email not sent - Error: Email log not sent!❌❌",
      origin: "send-email-logs-service.ts",
      severityLevel: "high",
    });
  });
});
