import { INestApplication } from '@nestjs/common';
export declare const commonUtils: {
    getConstants: (str: string) => any;
    getPrefix: (str: string) => string;
    addPrefix: (prefix: string, array: any) => any;
    removePrefix: (str: string) => string;
    sanitizeEntity: (array: any, privateElement: any) => any[];
    setupSwagger(app: INestApplication): void;
    searchSplit(search: string[]): {};
    orderSplit(order: string, alias: string): {};
    authCheck(auth: any, groupId: any): Promise<any>;
    calcTax(price: number, persent: string): number;
    createCode(): string;
    generateRandomString(num: any): string;
    generateRandomNumber(num: any): string;
    isMobile(agent: string): string;
    getArrayKey(arr: any, pks: string | string[], is_push: boolean): {};
    getStatus(key: string | string[]): any;
    isAdmin(groupId: string): boolean;
    isRoot(groupId: string): boolean;
    langValue(lang: any): string;
    formatPrice(price: any): string;
    stringNumberToInt(stringNumber: string): number;
    calcExchangeRate(price: number, exchange_rate: number): number;
    langChk(lang: any): string;
    getResponse(url: string, headers: object): Promise<import("axios").AxiosResponse<any, any>>;
    postResponse(url: string, headers: object, data: object): Promise<import("axios").AxiosResponse<any, any>>;
};
