import { MessageService } from './message.service';
export declare class AdminMessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    findAll(search: string[]): Promise<{
        message: {};
        messageType: import("./entities/message-type.entity").MessageTypeEntity[];
    }>;
    test(phone: string, type: string): Promise<void>;
    findOne(code: string): Promise<{
        result: {};
    }>;
    update(idx: string, code: string, status: string, tmpl: string): Promise<void>;
}
