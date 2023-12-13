import {
    FileSystemDatasource,
    MongoLogDatasource,
    PostgresLogDataSource,
    LogRepositoryImpl
} from "../Infraestructure";

import { envs } from "../config";
import {
    LogSeverityLevel,
    CheckService,
    CheckServiceMultiple,
    SendEmailLogs
} from "../domain";

import { CronService, EmailService } from "../presentation";

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
                ).execute("https://google.com");
            }
        )
    }
}