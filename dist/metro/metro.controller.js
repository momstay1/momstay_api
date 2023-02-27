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
exports.MetroController = void 0;
const common_1 = require("@nestjs/common");
const metro_service_1 = require("./metro.service");
const create_metro_dto_1 = require("./dto/create-metro.dto");
const update_metro_dto_1 = require("./dto/update-metro.dto");
const swagger_1 = require("@nestjs/swagger");
let MetroController = class MetroController {
    constructor(metroService) {
        this.metroService = metroService;
    }
    create(createMetroDto) {
        return this.metroService.create(createMetroDto);
    }
    async findAll(take, page, search) {
        const { results, total, pageTotal } = await this.metroService.findAll({ take, page }, search);
        return {
            results,
            total,
            pageTotal
        };
    }
    findOne(id) {
        return this.metroService.findOne(+id);
    }
    update(id, updateMetroDto) {
        return this.metroService.update(+id, updateMetroDto);
    }
    remove(id) {
        return this.metroService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_metro_dto_1.CreateMetroDto]),
    __metadata("design:returntype", void 0)
], MetroController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '지하철 리스트 API' }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        description: 'search=station:역이름<br>',
        required: false
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], MetroController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_metro_dto_1.UpdateMetroDto]),
    __metadata("design:returntype", void 0)
], MetroController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetroController.prototype, "remove", null);
MetroController = __decorate([
    (0, common_1.Controller)('metro'),
    (0, swagger_1.ApiTags)('지하철 API'),
    __metadata("design:paramtypes", [metro_service_1.MetroService])
], MetroController);
exports.MetroController = MetroController;
//# sourceMappingURL=metro.controller.js.map