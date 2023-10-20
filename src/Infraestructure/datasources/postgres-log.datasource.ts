import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDataSource extends LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        
        const { message, origin } = log;
        const level = severityLevelEnum[log.level];

        const newLog = await prismaClient.logModel.create({
            data: {
                level: level,
                message: message,
                origin: origin
            }
        });

        console.log(newLog);
    }
    async getLogs(serverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityLevelEnum[serverityLevel];

        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        });

        return logs.map(LogEntity.fromObject);

    }

}