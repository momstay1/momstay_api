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
const common_bcrypt_1 = require("../common/common.bcrypt");
const groups_service_1 = require("../groups/groups.service");
const user_sns_service_1 = require("../user-sns/user-sns.service");
const constants_1 = require("../users/constants");
const users_service_1 = require("../users/users.service");
const constants_2 = require("./constants");
let AuthService = class AuthService {
    constructor(userService, jwtService, groupsService, userSnsService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.groupsService = groupsService;
        this.userSnsService = userSnsService;
    }
    async validateUser(id, password) {
        const user = await this.userService.fineUser(id);
        if (user.status != constants_1.usersConstant.status.registration) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        const isHashValid = await common_bcrypt_1.commonBcrypt.isHashValid(password, user.password);
        const isSha1HashValid = await common_bcrypt_1.commonBcrypt.isSha1HashValid(password, user.prevPassword);
        if (user && isHashValid) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        else if (user && isSha1HashValid) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        else {
            throw new common_1.NotAcceptableException('비밀번호가 틀립니다.');
        }
        return null;
    }
    async login(user, type) {
        const userInfo = await this.userService.fineUser(user.id);
        if (type && type.indexOf(userInfo.group.id) == -1) {
            throw new common_1.NotFoundException('존재하지 않는 아이디 입니다.');
        }
        const payload = { userId: userInfo.id, userName: userInfo.name, userGrp: userInfo.group.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign({}, { expiresIn: constants_2.jwtConstants.refresh_expried_on }),
        };
    }
    async snsLogin(snsLoginUserDto) {
        const snsUserInfo = await this.userSnsService.findId(snsLoginUserDto.id);
        const user = await this.userService.findId(snsUserInfo.user.id);
        const payload = { userId: user.id, userName: user.name, userGrp: user.group.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign({}, { expiresIn: constants_2.jwtConstants.refresh_expried_on }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        groups_service_1.GroupsService,
        user_sns_service_1.UserSnsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map