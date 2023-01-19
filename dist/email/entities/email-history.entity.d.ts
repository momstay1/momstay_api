import { EmailTmplEntity } from './email-tmpl.entity';
export declare class EmailHistoryEntity {
    idx: number;
    status: number;
    email: string;
    response: string;
    emailTmpl: EmailTmplEntity;
    createdAt: Date;
    updatedAt: Date;
}
