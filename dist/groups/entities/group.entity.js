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
exports.GroupsEntity = void 0;
const admin_user_entity_1 = require("../../admin-users/entities/admin-user.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let GroupsEntity = class GroupsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupsEntity.prototype, "grp_idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], GroupsEntity.prototype, "grp_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GroupsEntity.prototype, "grp_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], GroupsEntity.prototype, "grp_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], GroupsEntity.prototype, "grp_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], GroupsEntity.prototype, "grp_memo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UsersEntity, (user) => user.user_group),
    __metadata("design:type", void 0)
], GroupsEntity.prototype, "grp_users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => admin_user_entity_1.AdminUsersEntity, (grp_admin) => grp_admin.admin_group),
    __metadata("design:type", void 0)
], GroupsEntity.prototype, "grp_admin", void 0);
GroupsEntity = __decorate([
    (0, typeorm_1.Entity)('groups')
], GroupsEntity);
exports.GroupsEntity = GroupsEntity;
//# sourceMappingURL=group.entity.js.map