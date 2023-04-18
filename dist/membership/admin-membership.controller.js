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
exports.AdminMembershipController = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("./membership.service");
const update_membership_dto_1 = require("./dto/update-membership.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../common/decorator/role.decorator");
const fs_1 = require("fs");
let AdminMembershipController = class AdminMembershipController {
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    async findAll(take, page, search, order) {
        const { data } = await this.membershipService.findAll({ take, page }, search, order);
        return Object.assign({}, data);
    }
    async excelDownload(take, page, search, order, res) {
        const excel_file = await this.membershipService.createExcel({ take, page }, search, order);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + excel_file.file_name + '"',
        });
        (0, fs_1.createReadStream)(excel_file.file_path).pipe(res);
    }
    async findOne(idx) {
        return await this.membershipService.findOne(+idx);
    }
    async membershipStatusChange(idx, updateMembershipDto) {
        return await this.membershipService.membershipStatusChange(+idx, updateMembershipDto);
    }
    remove(id) {
        return this.membershipService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '관리자 멤버십 리스트 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:1,2<br>' +
            'search=depositor:예금주명<br>' +
            'search=name:신청자명<br>' +
            'search=id:신청자 아이디<br>' +
            'search=phone:신청자 연락처<br>' +
            'search=month:멤버십 기간(1,3,6,12)<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", Promise)
], AdminMembershipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('excel'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 멤버십 리스트 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'search=status:1,2<br>' +
            'search=depositor:예금주명<br>' +
            'search=name:신청자명<br>' +
            'search=id:신청자 아이디<br>' +
            'search=phone:신청자 연락처<br>' +
            'search=month:멤버십 기간(1,3,6,12)<br>',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
        required: false,
    }),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String, Object]),
    __metadata("design:returntype", Promise)
], AdminMembershipController.prototype, "excelDownload", null);
__decorate([
    (0, common_1.Get)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 멤버십 상세 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminMembershipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idx'),
    (0, swagger_1.ApiOperation)({ summary: '관리자 멤버십 상태 변경 API' }),
    (0, role_decorator_1.Auth)(['root', 'admin']),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('idx')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_membership_dto_1.UpdateMembershipDto]),
    __metadata("design:returntype", Promise)
], AdminMembershipController.prototype, "membershipStatusChange", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminMembershipController.prototype, "remove", null);
AdminMembershipController = __decorate([
    (0, common_1.Controller)('admin/membership'),
    (0, swagger_1.ApiTags)('멤버십(관리자) API'),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], AdminMembershipController);
exports.AdminMembershipController = AdminMembershipController;
//# sourceMappingURL=admin-membership.controller.js.map