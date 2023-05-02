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
        host: string;
        name: string;
    };
    getFireBaseConfig(): {
        firebase_client_email: string;
        firebase_private_key: string;
    };
    getIamportConfig(): {
        iamport: string;
        iamport_key: string;
        iamport_secret_key: string;
    };
    getKoreaeximConfig(): {
        koreaexim: string;
    };
}
