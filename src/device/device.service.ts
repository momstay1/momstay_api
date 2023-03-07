import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceEntity } from './entities/device.entity';
import { commonUtils } from 'src/common/common.utils';

import * as moment from 'moment';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity) private deviceRepository: Repository<DeviceEntity>,
    private readonly jwtService: JwtService,
    // private readonly userService: UsersService,
    // private readonly productService: ProductService,
    // private readonly fileService: FileService,
  ) { }

  // 단말기 등록
  async create(createDeviceDto: CreateDeviceDto) {
    let deviceInfo;
    try {
      if (get(createDeviceDto, 'token', '')) {
        deviceInfo = await this.findOneToken(createDeviceDto['token']);
      } else {
        throw new NotAcceptableException('토큰 정보 없음');
      }
    } catch (error) {
      console.log({ error });
      deviceInfo = {};
    }

    deviceInfo['environment'] = createDeviceDto['environment'];
    if (get(createDeviceDto, 'environment') == 'web') {
      // 웹 접속인 경우 토큰 생성
      deviceInfo['token'] = await this.deivceCreateCode();
    } else {
      if (!get(createDeviceDto, 'token', '')) throw new NotAcceptableException('토큰 정보 없음');
      if (!get(createDeviceDto, 'appVersion', '')) throw new NotAcceptableException('앱 버전 정보 없음');
      if (!get(createDeviceDto, 'os', '')) throw new NotAcceptableException('운영체제 정보 없음');
      if (!get(createDeviceDto, 'osVersion', '')) throw new NotAcceptableException('운영체제 버전 정보 없음');
      // 앱 접속인 경우 단말기 정보 및 push token 저장
      deviceInfo['token'] = createDeviceDto['token'];
      deviceInfo['appVersion'] = createDeviceDto['appVersion'];
      deviceInfo['os'] = createDeviceDto['os'];
      deviceInfo['osVersion'] = createDeviceDto['osVersion'];
    }

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

  // 단말기 회원 정보 수정
  async updateUser(idx: number) {
    const deviceInfo = await this.findOneIdx(idx);

    deviceInfo['user'] = null;

    const device = await this.deviceRepository.save(deviceInfo);

    return { device };
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }

  async deivceCreateCode() {
    const code = moment().format('YYMMDD') + commonUtils.createCode().toUpperCase();
    const token = await this.createJwt({ webToken: code })
    const isCode = await this.deviceRepository.findOne({
      where: { token: token }
    });

    if (isCode) {
      await this.deivceCreateCode();
    } else {
      return token;
    }
  }

  async createJwt(payload: any, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
  }
}
