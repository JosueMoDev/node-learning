import { FileSystemDatasource } from "../Infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../Infraestructure/repositories/log.repository.impl";
import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/checks-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();
export class Server {
    public static start() {
        
        console.log(`server started on port ${envs.PORT}...`);

        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute('josuemodev@gmail.com');

        // emailService.sendEmail({
        //     to: 'josuemodev@gmail.com',
        //     subject: 'System logs',
        //     htmlBody: `

        //         <h3> System Logs </h3>
        //         <p>jalkjsalksjalksjalskajslakjsalksjalskjalskajslkajl</p>
            
        //     `
        // })

        // emailService.sendEmailWithFileSystemLogs('josuemodev@gmail.com');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('service up'),
                    () => console.log('Error on service'),
                ).execute("http://localhost:3000");
            }
        )
    }
}