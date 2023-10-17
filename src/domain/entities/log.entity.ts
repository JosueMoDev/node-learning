
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel
    public message: string;
    public createdAt?: Date;
    public origin: string;

    constructor(options: LogEntityOptions) { 
        
        const { level, message, createdAt = new Date, origin  } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt
        this.origin = origin
    }

    static fronJson = (json: string): LogEntity => { 
        
        const { message, level, createdAt } = JSON.parse(json);
        if (!message) throw new Error(`You Must Pride a message`);
        if (!level) throw new Error(`You Must Pride a severity level`);

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });
        log.createdAt = new Date(createdAt);

        return log;
        
    }


}