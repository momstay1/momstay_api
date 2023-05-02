/// <reference types="lodash" />
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingEntity } from './entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<SettingEntity>);
    getPrivateColumn(): string[];
    create(createSettingDto: CreateSettingDto): Promise<CreateSettingDto>;
    insert(data: any): Promise<void>;
    findAll(): string;
    findOne(key: string): Promise<SettingEntity>;
    find(key: string): Promise<import("lodash").Dictionary<SettingEntity>>;
    update(id: number, updateSettingDto: UpdateSettingDto): string;
    remove(id: number): string;
}
