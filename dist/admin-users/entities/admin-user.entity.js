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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersEntity = void 0;
const board_content_entity_1 = require("../../board-contents/entities/board-content.entity");
const common_bcrypt_1 = require("../../common/common.bcrypt");
const group_entity_1 = require("../../groups/entities/group.entity");
const typeorm_1 = require("typeorm");
let AdminUsersEntity = class AdminUsersEntity {
    async setPassword(password) {
        this.admin_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password || this.admin_password);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminUsersEntity.prototype, "admin_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], AdminUsersEntity.prototype, "admin_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'default' }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "user_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUsersEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AdminUsersEntity.prototype, "admin_memo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_content_entity_1.BoardContentsEntity, (bc) => bc.admin),
    __metadata("design:type", void 0)
], AdminUsersEntity.prototype, "board_contents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupsEntity, (group) => group.grp_users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", group_entity_1.GroupsEntity)
], AdminUsersEntity.prototype, "admin_group", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdminUsersEntity.prototype, "admin_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AdminUsersEntity.prototype, "admin_updatedAt", void 0);
AdminUsersEntity = __decorate([
    (0, typeorm_1.Entity)('admin_users')
], AdminUsersEntity);
exports.AdminUsersEntity = AdminUsersEntity;
//# sourceMappingURL=admin-user.entity.js.map