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
const nodeMailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const typeorm_1 = require("@nestjs/typeorm");
const email_history_entity_1 = require("./entities/email-history.entity");
const typeorm_2 = require("typeorm");
const email_tmpl_entity_1 = require("./entities/email-tmpl.entity");
const email_code_entity_1 = require("./entities/email-code.entity");
const common_utils_1 = require("../common/common.utils");
let EmailService = class EmailService {
    constructor(emailHistoryRepository, emailTmplRepository, emailCodeRepository) {
        this.emailHistoryRepository = emailHistoryRepository;
        this.emailTmplRepository = emailTmplRepository;
        this.emailCodeRepository = emailCodeRepository;
    }
    async snedMail(email_tmpl_idx, to, subject, html) {
        const configService = new config_service_1.ConfigService(process.env);
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
        const email_history = new email_history_entity_1.EmailHistoryEntity();
        console.log({ email_history });
        email_history.status = 2;
        email_history.emailTmpl = email_tmpl;
        email_history.response = JSON.stringify(result);
        email_history.email = to;
        await this.emailHistoryRepository.save(email_history);
    }
    async findEmailCode(code, email) {
        if (!email || !code) {
            throw new common_1.NotFoundException('잘못된 정보입니다.');
        }
        const email_code = await this.emailCodeRepository.findOne({
            where: { code: code, email: email, status: 0 },
        });
        if (!email_code) {
            throw new common_1.NotFoundException('잘못된 정보입니다.');
        }
        return email_code;
    }
    async findCode(code) {
        if (!code) {
            throw new common_1.NotFoundException('잘못된 정보입니다.');
        }
        const email_code = await this.emailCodeRepository.findOne({
            where: { code: code, status: 0 },
        });
        if (!email_code) {
            throw new common_1.NotFoundException('잘못된 정보입니다.');
        }
        return email_code;
    }
    async authCode(code, email) {
        if (!code || !email) {
            throw new common_1.NotFoundException('잘못된 정보입니다.');
        }
        await this.emailCodeRepository.createQueryBuilder()
            .update()
            .set({ status: 1 })
            .where("email = :email AND code = :code", { email: email, code: code })
            .execute();
    }
    async createCode(email, cnt) {
        if (!email) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
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
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_history_entity_1.EmailHistoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(email_tmpl_entity_1.EmailTmplEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(email_code_entity_1.EmailCodeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map