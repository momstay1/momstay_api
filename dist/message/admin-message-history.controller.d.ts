import { MessageService } from './message.service';
export declare class AdminMessageHistoryController {
    private readonly messageService;
    constructor(messageService: MessageService);
    findAll(year: string, month: string): Promise<{}>;
}
