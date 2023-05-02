import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, keyBy, keys } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Like, Repository } from 'typeorm';
import { settingsConstant } from './constants';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingEntity } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingEntity) private settingsRepository: Repository<SettingEntity>,
  ) { }

  getPrivateColumn(): string[] {
    return settingsConstant.privateColumn;
  }

  async create(createSettingDto: CreateSettingDto) {
    for (const index in createSettingDto.settings) {
      const key = keys(createSettingDto.settings[index]);
      await this.settingsRepository.save({ set_key: key[0], set_value: createSettingDto.settings[index][key[0]] });
    }
    return createSettingDto;
  }

  async insert(data) {
    const key = keys(data);
    const settings = await this.settingsRepository.create({ set_key: key[0], set_value: data[key[0]] });
    console.log(settings);
    await this.settingsRepository.save(settings);
  }

  findAll() {
    return `This action returns all settings`;
  }

  async findOne(key: string) {
    return await this.settingsRepository.findOne({ where: { set_key: key } });
  }

  async find(key: string) {
    const settings = await this.settingsRepository.find({ where: { set_key: Like(`%${key}%`) } });
    return keyBy(settings, (o) => o.set_key);
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
