import { INestApplication } from "@nestjs/common";
export declare const commonUtils: {
    getPrefix: (str: string) => string;
    addPrefix: (prefix: string, array: any) => any;
    removePrefix: (str: string) => string;
    sanitizeEntity: (array: any, privateElement: any) => any[];
    setupSwagger(app: INestApplication): void;
};
