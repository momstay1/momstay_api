import { EmailHistoryEntity } from './entities/email-history.entity';
import { Repository } from 'typeorm';
import { EmailTmplEntity } from './entities/email-tmpl.entity';
import { EmailCodeEntity } from './entities/email-code.entity';
import { EmailEntity } from './entities/email.entity';
export declare class EmailService {
    private emailRepository;
    private emailHistoryRepository;
    private emailTmplRepository;
    private emailCodeRepository;
    constructor(emailRepository: Repository<EmailEntity>, emailHistoryRepository: Repository<EmailHistoryEntity>, emailTmplRepository: Repository<EmailTmplEntity>, emailCodeRepository: Repository<EmailCodeEntity>);
    snedMail(email_tmpl_idx: number, to: string, subject: string, html: string): Promise<void>;
    findEmailCode(code: string, email: string): Promise<EmailCodeEntity | undefined>;
    findCode(code: string): Promise<EmailCodeEntity | undefined>;
    findOneIdxByEmail(idx: number): Promise<EmailEntity | undefined>;
    authCode(code: string, email: string): Promise<void>;
    emailFindAll(search: string[]): Promise<{}>;
    createCode(email: string, cnt: number): Promise<string>;
    update(idx: number, status: string): Promise<void>;
}
