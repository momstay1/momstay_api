import * as bcrypt from 'bcrypt';

const saltOrRounds = 11;
export const commonBcrypt = {
  setBcryptPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, saltOrRounds);
  },
  isHashValid: async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
  },
};
