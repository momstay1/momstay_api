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
exports.UsersEntity = void 0;
const board_content_entity_1 = require("../../board-contents/entities/board-content.entity");
const common_bcrypt_1 = require("../../common/common.bcrypt");
const defect_entity_1 = require("../../defect/entities/defect.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const typeorm_1 = require("typeorm");
let UsersEntity = class UsersEntity {
    async setPassword(password) {
        this.user_password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password || this.user_password);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersEntity.prototype, "user_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "user_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'default' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "user_signupVerifyToken", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersEntity.prototype, "user_place_idx", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_content_entity_1.BoardContentsEntity, (bc) => bc.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "board_contents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => defect_entity_1.DefectEntity, (dft) => dft.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "defect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupsEntity, (group) => group.grp_users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", group_entity_1.GroupsEntity)
], UsersEntity.prototype, "user_group", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "user_createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "user_updatedAt", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=user.entity.js.map