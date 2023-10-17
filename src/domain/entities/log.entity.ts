
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {

    public level: LogSeverityLevel
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel) { 
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fronJson = (json: string): LogEntity => { 
        
        const { message, level, createdAt } = JSON.parse(json);
        if (!message) throw new Error(`You Must Pride a message`);
        if (!level) throw new Error(`You Must Pride a severity level`);

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);

        return log;
        
    }


}