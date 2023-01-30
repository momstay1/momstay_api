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
exports.RefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_service_1 = require("./refresh-token.service");
const create_refresh_token_dto_1 = require("./dto/create-refresh-token.dto");
const update_refresh_token_dto_1 = require("./dto/update-refresh-token.dto");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }
    create(createRefreshTokenDto) {
        return this.refreshTokenService.create(createRefreshTokenDto);
    }
    findAll() {
        return this.refreshTokenService.findAll();
    }
    findOne(id) {
        return this.refreshTokenService.findOne(+id);
    }
    update(id, updateRefreshTokenDto) {
        return this.refreshTokenService.update(+id, updateRefreshTokenDto);
    }
    remove(id) {
        return this.refreshTokenService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_refresh_token_dto_1.CreateRefreshTokenDto]),
    __metadata("design:returntype", void 0)
], RefreshTokenController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RefreshTokenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RefreshTokenController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_refresh_token_dto_1.UpdateRefreshTokenDto]),
    __metadata("design:returntype", void 0)
], RefreshTokenController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RefreshTokenController.prototype, "remove", null);
RefreshTokenController = __decorate([
    (0, common_1.Controller)('refresh-token'),
    __metadata("design:paramtypes", [refresh_token_service_1.RefreshTokenService])
], RefreshTokenController);
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=refresh-token.controller.js.map