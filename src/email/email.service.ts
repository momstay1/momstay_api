import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

import * as nodeMailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailHistoryEntity } from './entities/email-history.entity';
import { Repository } from 'typeorm';
import { EmailTmplEntity } from './entities/email-tmpl.entity';
import { EmailCodeEntity } from './entities/email-code.entity';
import { commonUtils } from 'src/common/common.utils';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailHistoryEntity) private emailHistoryRepository: Repository<EmailHistoryEntity>,
    @InjectRepository(EmailTmplEntity) private emailTmplRepository: Repository<EmailTmplEntity>,
    @InjectRepository(EmailCodeEntity) private emailCodeRepository: Repository<EmailCodeEntity>,
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

  async findEmailCode(code: string, email: string): Promise<EmailCodeEntity | undefined> {
    if (!email || !code) {
      throw new NotFoundException('잘못된 정보입니다.');
    }
    const email_code = await this.emailCodeRepository.findOne({
      where: { code: code, email: email, status: 0 },
    });
    if (!email_code) {
      throw new NotFoundException('잘못된 정보입니다.');
    }

    return email_code;
  }

  async findCode(code: string): Promise<EmailCodeEntity | undefined> {
    if (!code) {
      throw new NotFoundException('잘못된 정보입니다.');
    }
    const email_code = await this.emailCodeRepository.findOne({
      where: { code: code, status: 0 },
    });
    if (!email_code) {
      throw new NotFoundException('잘못된 정보입니다.');
    }

    return email_code;
  }

  async authCode(code: string, email: string) {
    if (!code || !email) {
      throw new NotFoundException('잘못된 정보입니다.');
    }
    await this.emailCodeRepository.createQueryBuilder()
      .update()
      .set({ status: 1 })
      .where("email = :email AND code = :code", { email: email, code: code })
      .execute();
  }

  async createCode(email: string, cnt: number): Promise<string> {
    if (!email) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    if (cnt < 1) {
      await this.emailCodeRepository.createQueryBuilder()
        .delete()
        .where("email = :email AND status = :status", { email: email, status: 0 })
        .execute()
    }
    let code = commonUtils.createCode();
    try {
      await this.findCode(code);
      code = await this.createCode(email, 1);

    } catch (error) {
      const email_code = await this.emailCodeRepository.create({
        status: 0,
        email: email,
        code: code
      });
      await this.emailCodeRepository.save(email_code);
    }
    return code;
  }
}
