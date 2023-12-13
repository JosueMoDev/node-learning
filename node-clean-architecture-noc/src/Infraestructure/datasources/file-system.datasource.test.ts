import path from "path";
import fs from 'fs';
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain";

describe('File System Datasource', () => {

    const logPath = path.join(__dirname, '../../../logs');
    
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });
    
      
    test('should create log files if they dont exist ', () => {
        new FileSystemDatasource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual([
          "logs-all.log",
          "logs-high.log",
          "logs-medium.log",
        ]);
        
    });

    test('should save logs in "logs-all.log", "logs-medium.log"  and   "logs-high.log"', () => {
    
        const fileSystemlog = new FileSystemDatasource();

        const logLow = new LogEntity({
        message: "saving log at postgres db",
        level: LogSeverityLevel.low,
        origin: "postgres-log.datasource.test.ts",
        });

        const logHigh = new LogEntity({
        message: "saving log at postgres db",
        level: LogSeverityLevel.high,
        origin: "postgres-log.datasource.test.ts",
        });

        const logMedium = new LogEntity({
            message: "saving log at postgres db",
            level: LogSeverityLevel.medium,
            origin: "postgres-log.datasource.test.ts",
        });
        fileSystemlog.saveLog(logHigh);
        fileSystemlog.saveLog(logLow);
        fileSystemlog.saveLog(logMedium);


        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf8");
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf8");
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf8");


        expect(allLogs).toContain(JSON.stringify(logLow));
        expect(mediumLogs).toContain(JSON.stringify(logMedium));
        expect(highLogs).toContain(JSON.stringify(logHigh));

    });

    // test('should get logs from filesystem ', async () => {
        
    //     const fileSystemlog = new FileSystemDatasource();
    
    //     const logLow = new LogEntity({
    //     message: "saving log at postgres db",
    //     level: LogSeverityLevel.low,
    //     origin: "postgres-log.datasource.test.ts",
    //     });

    //     const logHigh = new LogEntity({
    //     message: "saving log at postgres db",
    //     level: LogSeverityLevel.high,
    //     origin: "postgres-log.datasource.test.ts",
    //     });

    //     const logMedium = new LogEntity({
    //         message: "saving log at postgres db",
    //         level: LogSeverityLevel.medium,
    //         origin: "postgres-log.datasource.test.ts",
    //     });
    //     await fileSystemlog.saveLog(logHigh);
    //     await fileSystemlog.saveLog(logLow);
    //     await fileSystemlog.saveLog(logMedium);

    //     await fileSystemlog.getLogs(LogSeverityLevel.low);
    //     const mediumLogs = await fileSystemlog.getLogs(LogSeverityLevel.medium);
    //     const highLogs = await fileSystemlog.getLogs(LogSeverityLevel.high);
        

    //     expect(allLogs.length).toBe(1);
    //     expect(mediumLogs.length).toBe(1);
    //     expect(highLogs.length).toBe(1);



    // });

});