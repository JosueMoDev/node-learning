import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource{


    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() { 
        this.createLogsFiles();
    }
    
    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(
            path => {
                if (fs.existsSync(path)) return;
                fs.writeFileSync(path, '');
            }
        )

    }

    private getLogsFromFile = (path: string): LogEntity[] => {

        const content = fs.readFileSync(path, 'utf-8');
        if (content === '') return [];
        return content.split('\n').map(LogEntity.fromJson);

    }

    async saveLog(log: LogEntity): Promise<boolean> {

        const logAsJson = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (log.level === LogSeverityLevel.low) return true;

        if (log.level === LogSeverityLevel.medium) fs.appendFileSync(this.mediumLogsPath, logAsJson);

        if (log.level === LogSeverityLevel.high)  fs.appendFileSync(this.highLogsPath, logAsJson);

        return true
        
    }
    async getLogs(serveriyLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (serveriyLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${serveriyLevel} not implemented`);
        }
    }

}