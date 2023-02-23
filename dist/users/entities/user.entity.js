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
const group_entity_1 = require("../../groups/entities/group.entity");
const login_entity_1 = require("../../login/entities/login.entity");
const order_product_entity_1 = require("../../order-product/entities/order-product.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const reservation_entity_1 = require("../../reservation/entities/reservation.entity");
const user_sns_entity_1 = require("../../user-sns/entities/user-sns.entity");
const typeorm_1 = require("typeorm");
let UsersEntity = class UsersEntity {
    async setPassword(password) {
        if (this.password) {
            this.password = await common_bcrypt_1.commonBcrypt.setBcryptPassword(password || this.password);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersEntity.prototype, "idx", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], UsersEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'default' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "prevPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: '0' }),
    __metadata("design:type", Object)
], UsersEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "other", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "signupVerifyToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "uniqueKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "certifiInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '1' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "marketing", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "oldIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "oldData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_content_entity_1.BoardContentsEntity, (bc) => bc.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "boardContents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (pr) => pr.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_product_entity_1.OrderProductEntity, (op) => op.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "orderProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => login_entity_1.LoginEntity, (login) => login.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.ReservationEntity, (rev) => rev.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_sns_entity_1.UserSnsEntity, (us) => us.user),
    __metadata("design:type", void 0)
], UsersEntity.prototype, "userSns", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupsEntity, (group) => group.users),
    __metadata("design:type", group_entity_1.GroupsEntity)
], UsersEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: '0' }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "leaveAt", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=user.entity.js.map