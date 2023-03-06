import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceEntity } from './entities/device.entity';

import * as moment from 'moment';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity) private deviceRepository: Repository<DeviceEntity>,
    // private readonly userService: UsersService,
    // private readonly productService: ProductService,
    // private readonly fileService: FileService,
  ) { }

  // 단말기 등록
  async create(createDeviceDto: CreateDeviceDto) {
    let deviceInfo;
    try {
      deviceInfo = await this.findOneToken(createDeviceDto['token']);
    } catch (error) {
      console.log({ error });
      deviceInfo = {};
    }

    deviceInfo['token'] = createDeviceDto['token'];
    deviceInfo['appVersion'] = createDeviceDto['appVersion'];
    deviceInfo['os'] = createDeviceDto['os'];
    deviceInfo['osVersion'] = createDeviceDto['osVersion'];
    deviceInfo['environment'] = createDeviceDto['environment'];
    if (get(deviceInfo, ['marketing'], '') != createDeviceDto['marketing']) {
      deviceInfo['marketing'] = createDeviceDto['marketing'];
      deviceInfo['marketingAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    if (get(deviceInfo, ['service'], '') != createDeviceDto['service']) {
      deviceInfo['service'] = createDeviceDto['service'];
      deviceInfo['serviceAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    const device = await this.deviceRepository.save(deviceInfo);

    return { device };
  }

  findAll() {
    return `This action returns all device`;
  }

  // 단말기 정보 가져오기
  async findOne(token: string) {
    const device = await this.findOneToken(token);

    return { device };
  }

  // 토큰으로 조회
  async findOneToken(token: string) {
    if (!token) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const device = await this.deviceRepository.findOne({
      where: { token: token },
      relations: ['user']
    })
    if (!get(device, 'idx', '')) {
      throw new NotFoundException('단말기 정보가 없습니다.');
    }
    return device;
  }

  // idx로 조회
  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const device = await this.deviceRepository.findOne({
      where: { idx: idx },
      relations: ['user']
    })
    if (!get(device, 'idx', '')) {
      throw new NotFoundException('단말기 정보가 없습니다.');
    }
    return device;
  }

  // 단말기 정보 수정
  async update(idx: number, updateDeviceDto: UpdateDeviceDto) {
    const deviceInfo = await this.findOneIdx(idx);

    if (get(updateDeviceDto, 'token', '')) deviceInfo['token'] = updateDeviceDto['token'];
    if (get(updateDeviceDto, 'appVersion', '')) deviceInfo['appVersion'] = updateDeviceDto['appVersion'];
    if (get(updateDeviceDto, 'os', '')) deviceInfo['os'] = updateDeviceDto['os'];
    if (get(updateDeviceDto, 'osVersion', '')) deviceInfo['osVersion'] = updateDeviceDto['osVersion'];
    if (get(updateDeviceDto, 'environment', '')) deviceInfo['environment'] = updateDeviceDto['environment'];
    if (get(updateDeviceDto, 'marketing', '')) {
      deviceInfo['marketing'] = updateDeviceDto['marketing'];
      deviceInfo['marketingAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    if (get(updateDeviceDto, 'service', '')) {
      deviceInfo['service'] = updateDeviceDto['service'];
      deviceInfo['serviceAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    const device = await this.deviceRepository.save(deviceInfo);

    return { device };
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
