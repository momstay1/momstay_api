"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersConstant = void 0;
exports.usersConstant = {
    prefix: 'user',
    privateColumn: ['user_password', 'user_signupVerifyToken'],
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
};
//# sourceMappingURL=constants.js.map