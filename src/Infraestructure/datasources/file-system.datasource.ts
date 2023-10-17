import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource{


    private readonly logPath = 'logs/';
    private readonly lowLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/log-medium.log';
    private readonly highLogsPath = 'logs/log-high.log';

    constructor() { 
        this.createLogsFiles();
    }
    
    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(
            path => {
                if (fs.existsSync(path)) return;
                fs.writeFileSync(path, '');
            }
        )

    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLog(serveriyLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}