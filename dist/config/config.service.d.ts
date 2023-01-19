import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class ConfigService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    isDevelopment(): boolean;
    getTypeOrmConfig(): TypeOrmModuleOptions;
    getEmailConfig(): {
        domain: string;
        email: string;
        api_key: string;
        auth_password: string;
        host: string;
        name: string;
    };
}
