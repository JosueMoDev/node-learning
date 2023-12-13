import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((errorMessage: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceUseCase {
    
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ) { }
    
    private callLog =(log: LogEntity) => this.logRepository.forEach(logRepository => logRepository.saveLog(log));

    public async execute(url: string): Promise<boolean> {


        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.callLog(log);
            this.successCallBack && this.successCallBack();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity({
                message: `Service ${url} is not working - ${errorMessage}`,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            
            this.callLog(log);
            this.errorCallBack && this.errorCallBack(errorMessage);
            return false;

        }

    }
}