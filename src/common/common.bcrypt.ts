import * as bcrypt from 'bcrypt';
const crypto = require('crypto');
const saltOrRounds = 11;
export const commonBcrypt = {
  setBcryptPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltOrRounds);
  },
  isHashValid: async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  },
  isSha1HashValid: async (password, hashPassword): Promise<boolean> => {
    const first = crypto.createHash('sha1').update(password).digest();
    const prevPassword = '*' + crypto.createHash('sha1').update(first).digest('hex').toUpperCase();
    return prevPassword === hashPassword;
  },
};
