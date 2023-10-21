import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("Email Service", () => {
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    };
  
    const mockLogRepository: LogRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    };
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    test("should call sendEmail and saveLog", async () => {

        const result = await sendEmailLogs.execute("jonasjosuemoraleses@gmail.com");
        expect(result).toBeTruthy;
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({ 
            createdAt: expect.any(Date),
            level: "low",
            message: "Message was sent",
            origin: "send-email.ts",
        });

    });

    test("should call save log in case of error", async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
        const result = await sendEmailLogs.execute(
            "jonasjosuemoraleses@gmail.com"
        );
        expect(result).toBeFalsy;
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toBeCalledWith({
          createdAt: expect.any(Date),
          level: "high",
          message: "Error: Email log not sent",
          origin: "send-email.ts",
        });
    });
});
