import { MessageService } from './message.service';
export declare class AdminMessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    findAll(search: string[]): Promise<{
        message: {};
        messageType: import("./entities/message-type.entity").MessageTypeEntity[];
    }>;
    findOne(code: string): Promise<{
        result: {};
    }>;
    test(phone: string, type: string): Promise<void>;
    update(idx: string, code: string, status: string, tmpl: string): Promise<void>;
}
