"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Role = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const role_auth_guard_1 = require("../../auth/guards/role-auth.guard");
const Role = (roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Role = Role;
function Auth(roles) {
    return (0, common_1.applyDecorators)((0, exports.Role)(roles), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.UseGuards)(role_auth_guard_1.RoleGuard));
}
exports.Auth = Auth;
//# sourceMappingURL=role.decorator.js.map