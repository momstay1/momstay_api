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
exports.BlockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const role_decorator_1 = require("../common/decorator/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const block_service_1 = require("./block.service");
const create_block_dto_1 = require("./dto/create-block.dto");
const update_block_dto_1 = require("./dto/update-block.dto");
let BlockController = class BlockController {
    constructor(blockService) {
        this.blockService = blockService;
    }
    async create(user, createBlockDto) {
        return await this.blockService.create(user, createBlockDto);
    }
    findAll() {
    }
    findOne(id) {
        return this.blockService.findOne(+id);
    }
    update(id, updateBlockDto) {
        return this.blockService.update(+id, updateBlockDto);
    }
    remove(id) {
        return this.blockService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '회원 차단 등록 API',
        description: '차단된 회원 목록은 /user/profile api 조회시 확인 가능'
    }),
    (0, role_decorator_1.Auth)(['Any']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_block_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_block_dto_1.UpdateBlockDto]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockController.prototype, "remove", null);
BlockController = __decorate([
    (0, common_1.Controller)('block'),
    (0, swagger_1.ApiTags)('차단 API'),
    __metadata("design:paramtypes", [block_service_1.BlockService])
], BlockController);
exports.BlockController = BlockController;
//# sourceMappingURL=block.controller.js.map