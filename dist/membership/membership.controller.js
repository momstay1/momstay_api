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
exports.MembershipController = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("./membership.service");
const create_membership_dto_1 = require("./dto/create-membership.dto");
const update_membership_dto_1 = require("./dto/update-membership.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const getuser_decorator_1 = require("../auth/getuser.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let MembershipController = class MembershipController {
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    async create(user, createMembershipDto) {
        console.log({ user });
        return await this.membershipService.create(user, createMembershipDto);
    }
    async findOne(user) {
        return await this.membershipService.findOneUser(user);
    }
    update(id, updateMembershipDto) {
        return this.membershipService.update(+id, updateMembershipDto);
    }
    remove(id) {
        return this.membershipService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '멤버십 신청 API',
        description: 'status값 미 입력시 자동으로 1 값으로 저장',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity,
        create_membership_dto_1.CreateMembershipDto]),
    __metadata("design:returntype", Promise)
], MembershipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '마지막 멤버십 신청 정보 가져오기 API',
    }),
    (0, role_decorator_1.Auth)(['root', 'admin', 'host']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], MembershipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_membership_dto_1.UpdateMembershipDto]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "remove", null);
MembershipController = __decorate([
    (0, common_1.Controller)('membership'),
    (0, swagger_1.ApiTags)('멤버십 API'),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], MembershipController);
exports.MembershipController = MembershipController;
//# sourceMappingURL=membership.controller.js.map