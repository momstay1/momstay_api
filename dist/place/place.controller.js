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
exports.PlaceController = void 0;
const common_1 = require("@nestjs/common");
const place_service_1 = require("./place.service");
const create_place_dto_1 = require("./dto/create-place.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
const role_decorator_1 = require("../common/decorator/role.decorator");
const swagger_1 = require("@nestjs/swagger");
const common_utils_1 = require("../common/common.utils");
const lodash_1 = require("lodash");
const place_entity_1 = require("./entities/place.entity");
let PlaceController = class PlaceController {
    constructor(placeService) {
        this.placeService = placeService;
    }
    sanitizePlace(data) {
        return common_utils_1.commonUtils.sanitizeEntity(data, this.placeService.getPrivateColumn());
    }
    ;
    async create(createPlaceDto) {
        const place = await this.placeService.create(createPlaceDto);
        return this.sanitizePlace(place);
    }
    async findAll(take, page) {
        const { results, total, pageTotal } = await this.placeService.findAll({ take, page });
        return {
            results: (0, lodash_1.map)(results, (obj) => {
                return this.sanitizePlace(obj);
            }),
            total,
            pageTotal
        };
    }
    async findOne(idx) {
        const place = await this.placeService.findOne(+idx);
        return this.sanitizePlace(place);
    }
    async statusUpdate(idxs, status) {
        await this.placeService.statusUpdate(idxs, status);
    }
    async update(idx, updatePlaceDto) {
        const place = await this.placeService.update(+idx, updatePlaceDto);
        return this.sanitizePlace(place);
    }
    async remove(idxs) {
        await this.placeService.removes(idxs);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_현장등록 API' }),
    (0, swagger_1.ApiBody)({ type: create_place_dto_1.CreatePlaceDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_place_dto_1.CreatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_현장 리스트 API' }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, role_decorator_1.Auth)(['root', 'admin', 'basic']),
    (0, swagger_1.ApiOperation)({ summary: '현장 정보 API' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity }),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_현장상태 일괄 변경 API' }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('idxs')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "statusUpdate", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자_현장수정 API' }),
    (0, swagger_1.ApiBody)({ type: create_place_dto_1.CreatePlaceDto }),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_place_dto_1.UpdatePlaceDto]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '현장삭제 API' }),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)('idxs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlaceController.prototype, "remove", null);
PlaceController = __decorate([
    (0, common_1.Controller)('place'),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], PlaceController);
exports.PlaceController = PlaceController;
//# sourceMappingURL=place.controller.js.map