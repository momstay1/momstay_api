import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
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
    const addPrefixPlaceDto = commonUtils.addPrefix(settingsConstant.prefix, createSettingDto);
    return await this.settingsRepository.save(addPrefixPlaceDto);
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
