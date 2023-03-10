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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const device_service_1 = require("./device.service");
const create_device_dto_1 = require("./dto/create-device.dto");
const update_device_dto_1 = require("./dto/update-device.dto");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    async create(createDeviceDto) {
        return await this.deviceService.create(createDeviceDto);
    }
    findAll() {
        return this.deviceService.findAll();
    }
    async findOne(token) {
        return await this.deviceService.findOne(token);
    }
    async update(idx, updateDeviceDto) {
        return await this.deviceService.update(+idx, updateDeviceDto);
    }
    remove(id) {
        return this.deviceService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '단말기 정보 등록 API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':token'),
    (0, swagger_1.ApiOperation)({ summary: '단말기 정보 상세 API' }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '단말기 정보 수정 API' }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_device_dto_1.UpdateDeviceDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "remove", null);
DeviceController = __decorate([
    (0, common_1.Controller)('device'),
    (0, swagger_1.ApiTags)('단말기 정보 API'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map