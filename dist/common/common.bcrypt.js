"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonBcrypt = void 0;
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const saltOrRounds = 11;
exports.commonBcrypt = {
    setBcryptPassword: async (password) => {
        return await bcrypt.hash(password, saltOrRounds);
    },
    isHashValid: async (password, hashPassword) => {
        return await bcrypt.compare(password, hashPassword);
    },
    isSha1HashValid: async (password, hashPassword) => {
        const first = crypto.createHash('sha1').update(password).digest();
        const prevPassword = '*' + crypto.createHash('sha1').update(first).digest('hex').toUpperCase();
        return prevPassword === hashPassword;
    },
};
//# sourceMappingURL=common.bcrypt.js.map