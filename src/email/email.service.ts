import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

import * as nodeMailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailHistoryEntity } from './entities/email-history.entity';
import { Repository } from 'typeorm';
import { EmailTmplEntity } from './entities/email-tmpl.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailHistoryEntity) private emailHistoryRepository: Repository<EmailHistoryEntity>,
    @InjectRepository(EmailTmplEntity) private emailTmplRepository: Repository<EmailTmplEntity>,
  ) { }

  async snedMail(email_tmpl_idx: number, to: string, subject: string, html: string) {
    const configService = new ConfigService(process.env);
    const emailConfig = configService.getEmailConfig();

    const auth = {
      auth: {
        api_key: emailConfig.api_key,
        domain: emailConfig.domain
      }
    };

    const email_tmpl = await this.emailTmplRepository.findOne({ idx: email_tmpl_idx });

    const transporter = nodeMailer.createTransport(mg(auth));

    const mail_option = {
      from: emailConfig.email,
      to: to,
      subject: subject,
      html: html || email_tmpl.template,
    };

    const result = await transporter.sendMail(mail_option);
    console.log({ result });

    const email_history = new EmailHistoryEntity();
    console.log({ email_history });
    email_history.status = 2;
    email_history.emailTmpl = email_tmpl;
    email_history.response = JSON.stringify(result);
    email_history.email = to;

    await this.emailHistoryRepository.save(email_history);
  }
}
