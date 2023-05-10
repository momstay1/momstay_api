"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const typeorm_1 = require("@nestjs/typeorm");
const email_history_entity_1 = require("./entities/email-history.entity");
const typeorm_2 = require("typeorm");
const email_tmpl_entity_1 = require("./entities/email-tmpl.entity");
const email_code_entity_1 = require("./entities/email-code.entity");
const common_utils_1 = require("../common/common.utils");
const lodash_1 = require("lodash");
const email_entity_1 = require("./entities/email.entity");
const settings_service_1 = require("../settings/settings.service");
const nodeMailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const fs = require("fs");
const file_service_1 = require("../file/file.service");
const uncertifiedStatus = 1;
const registrationStatus = 2;
const url = 'http://momstay.cf148.reconers.com';
const api_url = 'http://momstay_api.cf148.reconers.com';
let EmailService = class EmailService {
    constructor(emailRepository, emailHistoryRepository, emailTmplRepository, emailCodeRepository, settingsService, fileService) {
        this.emailRepository = emailRepository;
        this.emailHistoryRepository = emailHistoryRepository;
        this.emailTmplRepository = emailTmplRepository;
        this.emailCodeRepository = emailCodeRepository;
        this.settingsService = settingsService;
        this.fileService = fileService;
    }
    async sendMail(to, subject, html) {
        const configService = new config_service_1.ConfigService(process.env);
        const emailConfig = configService.getEmailConfig();
        const smtp = await this.settingsService.find('smtp');
        let transporter;
        let from_email;
        if ((0, lodash_1.get)(smtp, ['smtp_service', 'set_value'], '') != '') {
            from_email = smtp.smtp_user.set_value;
            transporter = nodeMailer.createTransport({
                service: smtp.smtp_service.set_value,
                auth: {
                    user: smtp.smtp_user.set_value,
                    pass: smtp.smtp_pass.set_value
                }
            });
        }
        else {
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
        const email_history = new email_history_entity_1.EmailHistoryEntity();
        console.log({ email_history });
        email_history.status = 2;
        email_history.response = JSON.stringify(result);
        email_history.email = to;
        await this.emailHistoryRepository.save(email_history);
    }
    async mailSettings(data, sendInfo) {
        let mail = '';
        let email_tmpl = '';
        const lang = data.lang = common_utils_1.commonUtils.langChk(data.lang == 'ko' ? data.lang : 'en');
        try {
            mail = await this.findOneEmail(data);
            const tmpl = fs.readFileSync('src/email/email_tmpl/' + lang + '/' + data.type + '/' + data.group + '_' + data.code + '.html', 'utf-8');
            const info = await this.mergeSendInfo(lang, sendInfo);
            email_tmpl = await this.replaceEmail(tmpl, info);
        }
        catch (error) {
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
        };
        let email_tmpl = tmpl;
        for (const key in replace_txt) {
            if ((0, lodash_1.get)(sendInfo, [key], null) != null) {
                const reg = new RegExp(replace_txt[key], 'g');
                email_tmpl = email_tmpl.replace(reg, sendInfo[key]);
            }
        }
        return email_tmpl;
    }
    async mergeSendInfo(lang, sendInfo) {
        var _a, _b;
        const site = await this.settingsService.find('site');
        const info = Object.assign({ url: url, site_title: (0, lodash_1.get)(site, ['site_' + lang + '_title', 'set_value'], (_a = site === null || site === void 0 ? void 0 : site.site_title) === null || _a === void 0 ? void 0 : _a.set_value), site_email: (0, lodash_1.get)(site, ['site_' + lang + '_email', 'set_value'], (_b = site === null || site === void 0 ? void 0 : site.site_email) === null || _b === void 0 ? void 0 : _b.set_value) }, sendInfo);
        return info;
    }
    async findOneEmail({ type, group, code, lang }) {
        if (!type || !group || !code || !lang) {
            throw new common_1.NotFoundException('email.service.findOneEmail: 잘못된 정보입니다.');
        }
        const email = await this.emailRepository.findOne({
            where: { code: code, group: group, language: lang },
        });
        if (!email) {
            throw new common_1.NotFoundException('email.service.findOneEmail: 조회된 메일이 없습니다.');
        }
        if (email.status != registrationStatus) {
            throw new common_1.NotAcceptableException('email.service.findOneEmail: 미사용중인 메일입니다.');
        }
        return email;
    }
    async findEmailCode(code, email) {
        if (!email || !code) {
            throw new common_1.NotFoundException('email.service.findEmailCode: 잘못된 정보입니다.');
        }
        const email_code = await this.emailCodeRepository.findOne({
            where: { code: code, email: email, status: 0 },
        });
        if (!email_code) {
            throw new common_1.NotFoundException('email.service.findEmailCode: 잘못된 정보입니다.');
        }
        return email_code;
    }
    async findCode(code) {
        if (!code) {
            throw new common_1.NotFoundException('email.service.findCode: 잘못된 정보입니다.');
        }
        const email_code = await this.emailCodeRepository.findOne({
            where: { code: code, status: 0 },
        });
        if (!email_code) {
            throw new common_1.NotFoundException('email.service.findCode: 잘못된 정보입니다.');
        }
        return email_code;
    }
    async findOneIdxByEmail(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('email.service.findOneIdxByEmail: 잘못된 정보입니다.');
        }
        const email = await this.emailRepository.findOne({
            where: { idx: idx },
        });
        if (!(0, lodash_1.get)(email, 'idx', '')) {
            throw new common_1.NotFoundException('email.service.findOneIdxByEmail: 조회된 정보가 없습니다.');
        }
        return email;
    }
    async authCode(code, email) {
        if (!code || !email) {
            throw new common_1.NotFoundException('email.service.authCode: 잘못된 정보입니다.');
        }
        await this.emailCodeRepository.createQueryBuilder()
            .update()
            .set({ status: 1 })
            .where("email = :email AND code = :code", { email: email, code: code })
            .execute();
    }
    async emailFindAll(search) {
        const where = common_utils_1.commonUtils.searchSplit(search);
        where['status'] = (0, lodash_1.get)(where, 'status', [uncertifiedStatus, registrationStatus]);
        console.log({ where });
        const email = await this.emailRepository.find({
            where: qb => {
                qb.where('status IN (:status)', { status: (0, lodash_1.isArray)((0, lodash_1.get)(where, 'status')) ? where['status'] : [where['status']] });
                (0, lodash_1.get)(where, 'group', '') && qb.andWhere('group IN (:group)', { group: (0, lodash_1.get)(where, 'group') });
                (0, lodash_1.get)(where, 'type', '') && qb.andWhere('type IN (:type)', { type: (0, lodash_1.get)(where, 'type') });
                (0, lodash_1.get)(where, 'code', '') && qb.andWhere('code IN (:code)', { code: (0, lodash_1.get)(where, 'code') });
            }
        });
        return common_utils_1.commonUtils.getArrayKey(email, ['type', 'code', 'group'], true);
    }
    async createCode(email, cnt) {
        if (!email) {
            throw new common_1.NotFoundException('email.service.createCode: 잘못된 정보 입니다.');
        }
        if (cnt < 1) {
            await this.emailCodeRepository.createQueryBuilder()
                .delete()
                .where("email = :email AND status = :status", { email: email, status: 0 })
                .execute();
        }
        let code = common_utils_1.commonUtils.createCode();
        try {
            await this.findCode(code);
            code = await this.createCode(email, 1);
        }
        catch (error) {
            const email_code = await this.emailCodeRepository.create({
                status: 0,
                email: email,
                code: code
            });
            await this.emailCodeRepository.save(email_code);
        }
        return code;
    }
    async update(idx, status) {
        await this.emailRepository.createQueryBuilder()
            .update()
            .set({ status: +status })
            .where({ idx: idx })
            .execute();
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_entity_1.EmailEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(email_history_entity_1.EmailHistoryEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(email_tmpl_entity_1.EmailTmplEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(email_code_entity_1.EmailCodeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        settings_service_1.SettingsService,
        file_service_1.FileService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map