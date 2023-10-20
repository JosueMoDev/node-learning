import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts LogDataSource', () => {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogDataSource implements LogDataSource {

        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test an abstract class', async() => {

        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);

        expect(mockLogDataSource).toHaveProperty('saveLog');
        expect(mockLogDataSource).toHaveProperty('getLogs');

        await mockLogDataSource.saveLog(newLog);

        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

        
    });
});