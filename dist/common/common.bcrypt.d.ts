export declare const commonBcrypt: {
    setBcryptPassword: (password: string) => Promise<string>;
    isHashValid: (password: any, hashPassword: any) => Promise<boolean>;
    isSha1HashValid: (password: any, hashPassword: any) => Promise<boolean>;
};
