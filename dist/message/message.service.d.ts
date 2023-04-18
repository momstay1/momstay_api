import { HttpService } from '@nestjs/axios';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageHistoryEntity } from './entities/message-history.entity';
import { MessageTypeEntity } from './entities/message-type.entity';
import { MessageEntity } from './entities/message.entity';
export declare class MessageService {
    private messageRepository;
    private messageTypeRepository;
    private messageHistoryRepository;
    private readonly settingsService;
    private readonly http;
    constructor(messageRepository: Repository<MessageEntity>, messageTypeRepository: Repository<MessageTypeEntity>, messageHistoryRepository: Repository<MessageHistoryEntity>, settingsService: SettingsService, http: HttpService);
    send(phone: string[], type: string, data?: any, reserveDt?: string): Promise<void>;
    bizmInfo(): Promise<{
        profileKey: string;
        bizmId: string;
        adminNumber: string;
        senderNumber: string;
    }>;
    historySave(res: any, history_data: any, datas: any): Promise<void>;
    replaceMessage(template: string, data: any): string;
    create(createMessageDto: CreateMessageDto): string;
    messageFindAll(search: string[]): Promise<{}>;
    messageFindOne(code: string): Promise<{
        result: {};
    }>;
    messageHistoryFindAll(year: string, month: string): Promise<{}>;
    messageFindType(typeStr: string): Promise<{}>;
    messageTypeFindAll(): Promise<MessageTypeEntity[]>;
    findOne(id: number): string;
    findOneIdx(idx: number): Promise<MessageEntity>;
    findOneCode(code: string): Promise<MessageEntity>;
    update(idx: number, code: string, status?: string, tmpl?: string): Promise<void>;
    remove(id: number): string;
    messageStatusChange(): Promise<void>;
}
