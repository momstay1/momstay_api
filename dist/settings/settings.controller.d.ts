/// <reference types="lodash" />
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto): Promise<CreateSettingDto>;
    findAll(): string;
    findOne(key: string): Promise<import("lodash").Dictionary<import("./entities/setting.entity").SettingEntity>>;
    update(id: string, updateSettingDto: UpdateSettingDto): string;
    remove(id: string): string;
}
