import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    sanitizeSettings(data: any): any[];
    create(createSettingDto: CreateSettingDto): Promise<CreateSettingDto>;
    findAll(): string;
    findOne(key: string): Promise<any[]>;
    update(id: string, updateSettingDto: UpdateSettingDto): string;
    remove(id: string): string;
}
