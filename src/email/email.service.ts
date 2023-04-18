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
import { get, isArray } from 'lodash';
import { EmailEntity } from './entities/email.entity';

const uncertifiedStatus = 1;
const registrationStatus = 2;
@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailEntity) private emailRepository: Repository<EmailEntity>,
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
      throw new NotFoundException('email.service.findEmailCode: 잘못된 정보입니다.');
    }
    const email_code = await this.emailCodeRepository.findOne({
      where: { code: code, email: email, status: 0 },
    });
    if (!email_code) {
      throw new NotFoundException('email.service.findEmailCode: 잘못된 정보입니다.');
    }

    return email_code;
  }

  async findCode(code: string): Promise<EmailCodeEntity | undefined> {
    if (!code) {
      throw new NotFoundException('email.service.findCode: 잘못된 정보입니다.');
    }
    const email_code = await this.emailCodeRepository.findOne({
      where: { code: code, status: 0 },
    });
    if (!email_code) {
      throw new NotFoundException('email.service.findCode: 잘못된 정보입니다.');
    }

    return email_code;
  }

  async findOneIdxByEmail(idx: number): Promise<EmailEntity | undefined> {
    if (!idx) {
      throw new NotFoundException('email.service.findOneIdxByEmail: 잘못된 정보입니다.');
    }
    const email = await this.emailRepository.findOne({
      where: { idx: idx },
    });
    if (!get(email, 'idx', '')) {
      throw new NotFoundException('email.service.findOneIdxByEmail: 조회된 정보가 없습니다.');
    }

    return email;
  }

  async authCode(code: string, email: string) {
    if (!code || !email) {
      throw new NotFoundException('email.service.authCode: 잘못된 정보입니다.');
    }
    await this.emailCodeRepository.createQueryBuilder()
      .update()
      .set({ status: 1 })
      .where("email = :email AND code = :code", { email: email, code: code })
      .execute();
  }

  async emailFindAll(search: string[]) {
    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [uncertifiedStatus, registrationStatus]);
    console.log({ where });
    const email = await this.emailRepository.find({
      where: qb => {
        qb.where('status IN (:status)', { status: isArray(get(where, 'status')) ? where['status'] : [where['status']] })
        get(where, 'group', '') && qb.andWhere('group IN (:group)', { group: get(where, 'group') })
        get(where, 'type', '') && qb.andWhere('type IN (:type)', { type: get(where, 'type') })
        get(where, 'code', '') && qb.andWhere('code IN (:code)', { code: get(where, 'code') })
      }
    });

    return commonUtils.getArrayKey(email, ['type', 'code', 'group'], true);
  }

  async createCode(email: string, cnt: number): Promise<string> {
    if (!email) {
      throw new NotFoundException('email.service.createCode: 잘못된 정보 입니다.');
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

  async update(idx: number, status: string) {
    await this.emailRepository.createQueryBuilder()
      .update()
      .set({ status: +status })
      .where({ idx: idx })
      .execute();
  }
}
