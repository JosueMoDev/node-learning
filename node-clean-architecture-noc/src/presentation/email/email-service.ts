import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
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

    constructor (){}

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


            return true;
        } catch (error) {
           const log = new LogEntity({
                message: 'Mail not sent',
                level: LogSeverityLevel.high,
                origin: 'email-service.ts'
            });
            return false;
        }

    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
   
        const subject = 'System logs';
        const htmlBody ='<h1>Testing</h1>';
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