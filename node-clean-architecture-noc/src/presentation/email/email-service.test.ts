import { EmailService, SendMailOptions } from './email-service';
import nodemailer from 'nodemailer';

describe('EmailService', () => {
    
    const mockSendMailer = jest.fn();
    
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMailer
    })
    const emailService = new EmailService();

    test('should send email', async() => {

        const options: SendMailOptions = {
            to: 'jonasjosuemoralese@gmail.com',
            subject: 'Email Service Testing',
            htmlBody: '<h1>Testing</h1>'
        }

        await emailService.sendEmail(options);
        expect(mockSendMailer).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            to: 'jonasjosuemoralese@gmail.com',
            subject: 'Email Service Testing',
            html: '<h1>Testing</h1>'
        });
    });

    test('should send email with attachments', async() => {
        await emailService.sendEmailWithFileSystemLogs('jonasjosuemoralese@gmail.com');
        expect(mockSendMailer).toHaveBeenCalledWith({
            attachments: expect.arrayContaining([
          { filename: "logs-all.log", path: "./logs/logs-all.log" },
          { filename: "logs-high.log", path: "./logs/logs-high.log" },
          { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
        ]),
            subject:'System logs',
            to: 'jonasjosuemoralese@gmail.com',
            html: '<h1>Testing</h1>',
            
        })
    });
});