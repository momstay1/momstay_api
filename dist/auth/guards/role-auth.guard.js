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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RoleGuard = class RoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(ctx) {
        const requiredRoles = this.reflector.get('roles', ctx.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if (requiredRoles.includes('Any'))
            return true;
        if (!user)
            return false;
        const group = user.group;
        return requiredRoles.includes(group);
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role-auth.guard.js.map