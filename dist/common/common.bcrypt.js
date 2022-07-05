"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonBcrypt = void 0;
const bcrypt = require("bcrypt");
const saltOrRounds = 11;
exports.commonBcrypt = {
    setBcryptPassword: async (password) => {
        return await bcrypt.hash(password, saltOrRounds);
    },
    isHashValid: async (password, hashPassword) => {
        return await bcrypt.compare(password, hashPassword);
    },
};
//# sourceMappingURL=common.bcrypt.js.map