import { EmailService } from './email.service';
export declare class AdminEmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    findAll(search: string[]): Promise<{
        message: {};
    }>;
    update(idx: string, status: string): Promise<void>;
}
