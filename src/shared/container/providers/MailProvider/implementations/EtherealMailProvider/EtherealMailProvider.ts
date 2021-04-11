import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/IEmailProvider';
import * as handlebars from "handlebars";

class EtherealMailProvider implements IMailProvider {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            this.client = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })
        }).catch(e => console.error(e));
    }

    async sendMail(to: string, subject: string, path: string, variables: any): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');
        const templateParse = handlebars.compile(templateFileContent);

        const templateHtml = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <no-reply@rentx.com.br>",
            subject,
            html: templateHtml
        });

        console.log(`[Message id]: ${message.messageId}`);
        console.log(`[Preview URL]: ${nodemailer.getTestMessageUrl(message)}`);
    }
}

export default EtherealMailProvider;
