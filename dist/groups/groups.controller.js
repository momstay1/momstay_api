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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("./groups.service");
const group_entity_1 = require("./entities/group.entity");
const role_decorator_1 = require("../common/decorator/role.decorator");
const swagger_1 = require("@nestjs/swagger");
const getuser_decorator_1 = require("../auth/getuser.decorator");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    async findAll(user) {
        return await this.groupsService.findAll(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Auth)(['root', 'admin', 'basic']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: '그룹 리스트 API' }),
    (0, swagger_1.ApiOkResponse)({ type: group_entity_1.GroupsEntity }),
    __param(0, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findAll", null);
GroupsController = __decorate([
    (0, common_1.Controller)('groups'),
    (0, swagger_1.ApiTags)('회원그룹 API'),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
exports.GroupsController = GroupsController;
//# sourceMappingURL=groups.controller.js.map