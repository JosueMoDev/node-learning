import { LogModel } from "../../mongo-db/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<boolean> {
        const newLog = await LogModel.create(log);
        return newLog ? true : false;
    }
    async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logsBySeverityLevel = await LogModel.find({ level: serverityLevel });
        return logsBySeverityLevel.map(LogEntity.fromObject);
    }

}