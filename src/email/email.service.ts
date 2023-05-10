import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailHistoryEntity } from './entities/email-history.entity';
import { Repository } from 'typeorm';
import { EmailTmplEntity } from './entities/email-tmpl.entity';
import { EmailCodeEntity } from './entities/email-code.entity';
import { commonUtils } from 'src/common/common.utils';
import { get, isArray } from 'lodash';
import { EmailEntity } from './entities/email.entity';
import { SettingsService } from 'src/settings/settings.service';

import * as nodeMailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';
import * as fs from "fs";
import { FileService } from 'src/file/file.service';

const uncertifiedStatus = 1;
const registrationStatus = 2;
const url = 'http://momstay.cf148.reconers.com';
const api_url = 'http://momstay_api.cf148.reconers.com';
@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailEntity) private emailRepository: Repository<EmailEntity>,
    @InjectRepository(EmailHistoryEntity) private emailHistoryRepository: Repository<EmailHistoryEntity>,
    @InjectRepository(EmailTmplEntity) private emailTmplRepository: Repository<EmailTmplEntity>,
    @InjectRepository(EmailCodeEntity) private emailCodeRepository: Repository<EmailCodeEntity>,
    private readonly settingsService: SettingsService,
    private readonly fileService: FileService,
  ) { }

  async sendMail(to: string, subject: string, html: string) {
    const configService = new ConfigService(process.env);
    const emailConfig = configService.getEmailConfig();
    const smtp = await this.settingsService.find('smtp');
    let transporter;
    let from_email;
    if (get(smtp, ['smtp_service', 'set_value'], '') != '') {
      from_email = smtp.smtp_user.set_value;
      transporter = nodeMailer.createTransport({
        service: smtp.smtp_service.set_value,
        auth: {
          user: smtp.smtp_user.set_value,
          pass: smtp.smtp_pass.set_value
        }
      });
    } else {
      from_email = emailConfig.email;
      const auth = {
        auth: {
          api_key: emailConfig.api_key,
          domain: emailConfig.domain
        }
      };
      transporter = nodeMailer.createTransport(mg(auth));
    }


    const mail_option = {
      from: from_email,
      to: to,
      subject: subject,
      html: html,
    };
    const result = await transporter.sendMail(mail_option);
    console.log({ result });

    const email_history = new EmailHistoryEntity();
    console.log({ email_history });
    email_history.status = 2;
    email_history.response = JSON.stringify(result);
    email_history.email = to;

    await this.emailHistoryRepository.save(email_history);
  }

  async mailSettings(data, sendInfo) {
    let mail: any = '';
    let email_tmpl = '';
    const lang = data.lang = commonUtils.langChk(data.lang == 'ko' ? data.lang : 'en');
    try {
      // 메일 정보 가져오기
      mail = await this.findOneEmail(data);
      // 템플릿 가져오기
      const tmpl = fs.readFileSync('src/email/email_tmpl/' + lang + '/' + data.type + '/' + data.group + '_' + data.code + '.html', 'utf-8');
      // 템플릿 문자 치환
      const info = await this.mergeSendInfo(lang, sendInfo);
      email_tmpl = await this.replaceEmail(tmpl, info);
    } catch (error) {
      console.log('메일 발송 실패: ', { error });
    }

    return { mail, email_tmpl };
  }

  async replaceEmail(tmpl, sendInfo) {
    const replace_txt = {
      url: '#{사이트URL}',
      site_title: '#{회사명}',
      site_email: '#{관리자 이메일}',
      product_title: '#{숙소이름}',
      po_title: '#{방이름}',
      guest_name: '#{방문자명}',
      visit_date: '#{방문날짜}',
      occupancy_date: '#{입주날짜}',
      eviction_date: '#{퇴거날짜}',
      phone: '#{연락처}',
      user_name: '#{회원이름}',
      user_id: '#{회원아이디}',
      dormant_date: '#{전환 예정일}',
      membership_month: '#{멤버십개월}',
      membership_price: '#{멤버십금액}',
      membership_bank: '#{은행명}',
      membership_account: '#{계좌번호}',
      board_title: '#{게시판이름}',
      inquiry_content: '#{문의내용}',
      answer_content: '#{답변내용}',
      payment: '#{결제금액}',
      po_payment: '#{방금액}',
      tax: '#{부가세}',
      fee: '#{수수료}',
      cancel_reason: '#{취소사유}',
      // link: '#{링크}',
      // logo: '#{로고 이미지 변수}',
    };
    let email_tmpl = tmpl;
    for (const key in replace_txt) {
      if (get(sendInfo, [key], null) != null) {
        const reg = new RegExp(replace_txt[key], 'g');
        email_tmpl = email_tmpl.replace(reg, sendInfo[key]);
      }
    }
    return email_tmpl;
  }

  async mergeSendInfo(lang, sendInfo) {
    const site = await this.settingsService.find('site');
    const info = {
      url: url,
      site_title: get(site, ['site_' + lang + '_title', 'set_value'], site?.site_title?.set_value),
      site_email: get(site, ['site_' + lang + '_email', 'set_value'], site?.site_email?.set_value),
      ...sendInfo
    }
    return info;
  }

  async findOneEmail({ type, group, code, lang }) {
    if (!type || !group || !code || !lang) {
      throw new NotFoundException('email.service.findOneEmail: 잘못된 정보입니다.');
    }
    const email = await this.emailRepository.findOne({
      where: { code: code, group: group, language: lang },
    });
    if (!email) {
      throw new NotFoundException('email.service.findOneEmail: 조회된 메일이 없습니다.');
    }
    if (email.status != registrationStatus) {
      throw new NotAcceptableException('email.service.findOneEmail: 미사용중인 메일입니다.');
    }

    return email;
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
