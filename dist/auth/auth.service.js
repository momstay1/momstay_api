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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_users_service_1 = require("../admin-users/admin-users.service");
const common_bcrypt_1 = require("../common/common.bcrypt");
const groups_service_1 = require("../groups/groups.service");
const constants_1 = require("../users/constants");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, adminService, jwtService, groupsService) {
        this.userService = userService;
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.groupsService = groupsService;
    }
    async validateUser(id, password) {
        const user = await this.userService.findOne(id);
        if (user.user_status != constants_1.usersConstant.status.registration) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        const isHashValid = await common_bcrypt_1.commonBcrypt.isHashValid(password, user.user_password);
        if (user && isHashValid) {
            const { user_password } = user, result = __rest(user, ["user_password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const userInfo = await this.userService.findOne(user.user_id);
        const group = await this.groupsService.findOne(userInfo.user_group.grp_idx);
        const payload = { userId: userInfo.user_id, userName: userInfo.user_name, userGrp: group.grp_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async admin_login(id, password) {
        const admin = await this.adminService.findOne(id);
        const isHashValid = await common_bcrypt_1.commonBcrypt.isHashValid(password, admin.admin_password);
        if (admin && isHashValid) {
            const group = await this.groupsService.findOne(admin.admin_group.grp_idx);
            const payload = { userId: admin.admin_id, userName: admin.admin_name, userGrp: group.grp_id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        else {
            return null;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        admin_users_service_1.AdminUsersService,
        jwt_1.JwtService,
        groups_service_1.GroupsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map