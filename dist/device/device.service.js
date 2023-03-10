"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("./entities/device.entity");
const common_utils_1 = require("../common/common.utils");
const moment = require("moment");
const jwt_1 = require("@nestjs/jwt");
let DeviceService = class DeviceService {
    constructor(deviceRepository, jwtService) {
        this.deviceRepository = deviceRepository;
        this.jwtService = jwtService;
    }
    async create(createDeviceDto) {
        let deviceInfo;
        try {
            if ((0, lodash_1.get)(createDeviceDto, 'token', '')) {
                deviceInfo = await this.findOneToken(createDeviceDto['token']);
            }
            else {
                throw new common_1.NotAcceptableException('토큰 정보 없음');
            }
        }
        catch (error) {
            console.log({ error });
            deviceInfo = {};
        }
        deviceInfo['environment'] = createDeviceDto['environment'];
        if ((0, lodash_1.get)(createDeviceDto, 'environment') == 'web') {
            deviceInfo['token'] = await this.deivceCreateCode();
        }
        else {
            if (!(0, lodash_1.get)(createDeviceDto, 'token', ''))
                throw new common_1.NotAcceptableException('토큰 정보 없음');
            if (!(0, lodash_1.get)(createDeviceDto, 'appVersion', ''))
                throw new common_1.NotAcceptableException('앱 버전 정보 없음');
            if (!(0, lodash_1.get)(createDeviceDto, 'os', ''))
                throw new common_1.NotAcceptableException('운영체제 정보 없음');
            if (!(0, lodash_1.get)(createDeviceDto, 'osVersion', ''))
                throw new common_1.NotAcceptableException('운영체제 버전 정보 없음');
            deviceInfo['token'] = createDeviceDto['token'];
            deviceInfo['appVersion'] = createDeviceDto['appVersion'];
            deviceInfo['os'] = createDeviceDto['os'];
            deviceInfo['osVersion'] = createDeviceDto['osVersion'];
        }
        if ((0, lodash_1.get)(deviceInfo, ['marketing'], '') != createDeviceDto['marketing']) {
            deviceInfo['marketing'] = createDeviceDto['marketing'];
            deviceInfo['marketingAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        if ((0, lodash_1.get)(deviceInfo, ['service'], '') != createDeviceDto['service']) {
            deviceInfo['service'] = createDeviceDto['service'];
            deviceInfo['serviceAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        const device = await this.deviceRepository.save(deviceInfo);
        return { device };
    }
    findAll() {
        return `This action returns all device`;
    }
    async findOne(token) {
        const device = await this.findOneToken(token);
        return { device };
    }
    async findOneToken(token) {
        if (!token) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const device = await this.deviceRepository.findOne({
            where: { token: token },
            relations: ['user']
        });
        if (!(0, lodash_1.get)(device, 'idx', '')) {
            throw new common_1.NotFoundException('단말기 정보가 없습니다.');
        }
        return device;
    }
    async findOneIdx(idx) {
        if (!idx) {
            throw new common_1.NotFoundException('잘못된 정보 입니다.');
        }
        const device = await this.deviceRepository.findOne({
            where: { idx: idx },
            relations: ['user']
        });
        if (!(0, lodash_1.get)(device, 'idx', '')) {
            throw new common_1.NotFoundException('단말기 정보가 없습니다.');
        }
        return device;
    }
    async update(idx, updateDeviceDto) {
        const deviceInfo = await this.findOneIdx(idx);
        if ((0, lodash_1.get)(updateDeviceDto, 'token', ''))
            deviceInfo['token'] = updateDeviceDto['token'];
        if ((0, lodash_1.get)(updateDeviceDto, 'appVersion', ''))
            deviceInfo['appVersion'] = updateDeviceDto['appVersion'];
        if ((0, lodash_1.get)(updateDeviceDto, 'os', ''))
            deviceInfo['os'] = updateDeviceDto['os'];
        if ((0, lodash_1.get)(updateDeviceDto, 'osVersion', ''))
            deviceInfo['osVersion'] = updateDeviceDto['osVersion'];
        if ((0, lodash_1.get)(updateDeviceDto, 'environment', ''))
            deviceInfo['environment'] = updateDeviceDto['environment'];
        if ((0, lodash_1.get)(updateDeviceDto, 'marketing', '')) {
            deviceInfo['marketing'] = updateDeviceDto['marketing'];
            deviceInfo['marketingAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        if ((0, lodash_1.get)(updateDeviceDto, 'service', '')) {
            deviceInfo['service'] = updateDeviceDto['service'];
            deviceInfo['serviceAt'] = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        const device = await this.deviceRepository.save(deviceInfo);
        return { device };
    }
    async updateUser(idx) {
        const deviceInfo = await this.findOneIdx(idx);
        deviceInfo['user'] = null;
        const device = await this.deviceRepository.save(deviceInfo);
        return { device };
    }
    remove(id) {
        return `This action removes a #${id} device`;
    }
    async deivceCreateCode() {
        const code = moment().format('YYMMDD') + common_utils_1.commonUtils.createCode().toUpperCase();
        const token = await this.createJwt({ webToken: code });
        const isCode = await this.deviceRepository.findOne({
            where: { token: token }
        });
        if (isCode) {
            await this.deivceCreateCode();
        }
        else {
            return token;
        }
    }
    async createJwt(payload, options) {
        return this.jwtService.sign(payload, options);
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.DeviceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map