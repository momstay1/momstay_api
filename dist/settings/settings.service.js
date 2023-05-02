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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    getPrivateColumn() {
        return constants_1.settingsConstant.privateColumn;
    }
    async create(createSettingDto) {
        for (const index in createSettingDto.settings) {
            const key = (0, lodash_1.keys)(createSettingDto.settings[index]);
            await this.settingsRepository.save({ set_key: key[0], set_value: createSettingDto.settings[index][key[0]] });
        }
        return createSettingDto;
    }
    async insert(data) {
        const key = (0, lodash_1.keys)(data);
        const settings = await this.settingsRepository.create({ set_key: key[0], set_value: data[key[0]] });
        console.log(settings);
        await this.settingsRepository.save(settings);
    }
    findAll() {
        return `This action returns all settings`;
    }
    async findOne(key) {
        return await this.settingsRepository.findOne({ where: { set_key: key } });
    }
    async find(key) {
        const settings = await this.settingsRepository.find({ where: { set_key: (0, typeorm_2.Like)(`%${key}%`) } });
        return (0, lodash_1.keyBy)(settings, (o) => o.set_key);
    }
    update(id, updateSettingDto) {
        return `This action updates a #${id} setting`;
    }
    remove(id) {
        return `This action removes a #${id} setting`;
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.SettingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map