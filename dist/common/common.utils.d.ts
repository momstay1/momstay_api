import { INestApplication } from "@nestjs/common";
export declare const commonUtils: {
    getConstants: (str: string) => any;
    getPrefix: (str: string) => string;
    addPrefix: (prefix: string, array: any) => any;
    removePrefix: (str: string) => string;
    sanitizeEntity: (array: any, privateElement: any) => any[];
    setupSwagger(app: INestApplication): void;
    searchSplit(search: string[]): {};
    authCheck(auth: any, groups: any): Promise<any[]>;
    createCode(): string;
};
