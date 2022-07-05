"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersConstant = void 0;
exports.usersConstant = {
    prefix: 'user',
    adminPrefix: 'admin',
    privateColumn: ['user_password', 'user_signupVerifyToken'],
    adminPrivateColumn: ['admin_password'],
    status: {
        delete: 0,
        uncertified: 1,
        registration: 2,
        dormant: 5,
        leave: 9,
    },
    default: {
        group_idx: 2,
    },
    admin: {
        group_idx: 1,
    }
};
//# sourceMappingURL=constants.js.map