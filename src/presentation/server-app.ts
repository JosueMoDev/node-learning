import { FileSystemDatasource } from "../Infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../Infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../Infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../Infraestructure/repositories/log.repository.impl";
import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/checks-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());

const emailService = new EmailService();
export class Server {
    public static async start() {
        
        console.log(`server started on port ${envs.PORT}...`);

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('josuemodev@gmail.com');

        // emailService.sendEmail({
        //     to: 'josuemodev@gmail.com',
        //     subject: 'System logs',
        //     htmlBody: `

        //         <h3> System Logs </h3>
        //         <p>jalkjsalksjalksjalskajslakjsalksjalskjalskajslkajl</p>
            
        //     `
        // })

        // emailService.sendEmailWithFileSystemLogs('josuemodev@gmail.com');
      
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         new CheckService(
        //             postgresLogRepository,
        //             () => console.log('service up'),
        //             () => console.log('Error on service'),
        //         ).execute("http://localhost:3000");
        //     }
        // );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    [postgresLogRepository, mongoLogRepository, fileSystemLogRepository],
                    () => console.log('service up'),
                    () => console.log('Error on service'),
                ).execute("http://localhost:3000");
            }
        )
    }
}