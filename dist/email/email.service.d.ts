import { EmailHistoryEntity } from './entities/email-history.entity';
import { Repository } from 'typeorm';
import { EmailTmplEntity } from './entities/email-tmpl.entity';
import { EmailCodeEntity } from './entities/email-code.entity';
import { EmailEntity } from './entities/email.entity';
import { SettingsService } from 'src/settings/settings.service';
import { FileService } from 'src/file/file.service';
export declare class EmailService {
    private emailRepository;
    private emailHistoryRepository;
    private emailTmplRepository;
    private emailCodeRepository;
    private readonly settingsService;
    private readonly fileService;
    constructor(emailRepository: Repository<EmailEntity>, emailHistoryRepository: Repository<EmailHistoryEntity>, emailTmplRepository: Repository<EmailTmplEntity>, emailCodeRepository: Repository<EmailCodeEntity>, settingsService: SettingsService, fileService: FileService);
    sendMail(to: string, subject: string, html: string): Promise<void>;
    mailSettings(data: any, sendInfo: any): Promise<{
        mail: any;
        email_tmpl: string;
    }>;
    replaceEmail(tmpl: any, sendInfo: any): Promise<any>;
    mergeSendInfo(lang: any, sendInfo: any): Promise<any>;
    findOneEmail({ type, group, code, lang }: {
        type: any;
        group: any;
        code: any;
        lang: any;
    }): Promise<EmailEntity>;
    findEmailCode(code: string, email: string): Promise<EmailCodeEntity | undefined>;
    findCode(code: string): Promise<EmailCodeEntity | undefined>;
    findOneIdxByEmail(idx: number): Promise<EmailEntity | undefined>;
    authCode(code: string, email: string): Promise<void>;
    emailFindAll(search: string[]): Promise<{}>;
    createCode(email: string, cnt: number): Promise<string>;
    update(idx: number, status: string): Promise<void>;
}
