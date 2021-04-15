import fs from 'fs';
import { SES } from 'aws-sdk';
import * as handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/container/providers/MailProvider/IEmailProvider';

class SESMailProvider implements IMailProvider {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            this.client = nodemailer.createTransport({
                SES: new SES({
                    region: process.env.AWS_REGION,
                    apiVersion: '2010-12-01',
                }),
            })
        }).catch(e => console.error(e));
    }

    async sendMail(to: string, subject: string, path: string, variables: any): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');
        const templateParse = handlebars.compile(templateFileContent);

        const templateHtml = templateParse(variables);

        await this.client.sendMail({
            to,
            from: "Rentx <no-reply@rentx.com.br>",
            subject,
            html: templateHtml
        });
    }
}

export default SESMailProvider;
