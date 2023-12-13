import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('LogEntity', () => {

    const objectData = {
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    }
    test('Should create a LogEntity instance', () => {
        const newLog = new LogEntity(objectData);
        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog.message).toBe(objectData.message);
        expect(newLog.level).toBe(objectData.level);
        expect(newLog.origin).toBe(objectData.origin);
        expect(newLog.createdAt).toBeInstanceOf(Date);

    });

    test( 'should create a LogEntity instance from json ', () => {
        const json = `{"message":"Service http://localhost:3000 is not working - TypeError: fetch failed","level":"high","createdAt":"2023-10-19T16:29:25.025Z","origin":"check-service.ts"}`;
        const log = LogEntity.fromJson(json);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.message).toBe("Service http://localhost:3000 is not working - TypeError: fetch failed");
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(objectData);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.level).toBe(objectData.level);
        expect(log.message).toBe(objectData.message);
        expect(log.origin).toBe(objectData.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    
});