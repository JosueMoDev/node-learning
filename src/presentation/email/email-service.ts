import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachments[]

}

interface Attachments {
    filename: string,
    path: string
}

export class EmailService { 
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor (private readonly logRepository: LogRepository){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const {to, subject, htmlBody, attachments = []} = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to: to, 
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });


            const log = new LogEntity({
                message: 'Mail has sent',
                level: LogSeverityLevel.medium,
                origin: 'email-service.ts'
            });

            this.logRepository.saveLog(log);

            return true;
        } catch (error) {
           const log = new LogEntity({
                message: 'Mail not sent',
                level: LogSeverityLevel.high,
                origin: 'email-service.ts'
            });
            this.logRepository.saveLog(log);
            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
   
        const subject = 'System logs';
        const htmlBody = `
            <h3> System Logs </h3>
            <p>jalkjsalksjalksjalskajslakjsalksjalskjalskajslkajl</p>
        `;
        const attachments: Attachments[] = [
          { filename: "logs-all.log", path: "./logs/logs-all.log" },
          { filename: "logs-high.log", path: "./logs/logs-high.log" },
          { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
        ];
    
      return this.sendEmail({
        to,
        subject,
        htmlBody,
        attachments
      })
    }

}