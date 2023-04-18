"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
require('dotenv').config();
class ConfigService {
    constructor(env) {
        this.env = env;
    }
    getValue(key, throwOnMissing = true) {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}, value: ${value}`);
        }
        return value;
    }
    isDevelopment() {
        return this.getValue('NODE_ENV', false) === 'development';
    }
    getTypeOrmConfig() {
        return {
            type: 'mysql',
            host: this.getValue('DB_HOST'),
            port: +this.getValue('DB_PORT'),
            username: this.getValue('DB_USERNAME'),
            password: this.getValue('DB_PASSWORD'),
            database: this.getValue('DB_DATABASE'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            migrationsTableName: 'migrations',
            migrations: ['src/migration/*.ts'],
            cli: {
                migrationsDir: 'src/migration',
            },
            synchronize: true,
            ssl: false,
            timezone: this.getValue('DB_TIMEZONE'),
            logging: Boolean(this.getValue('DB_LOGGING') == 'true'),
        };
    }
    getEmailConfig() {
        return {
            domain: this.getValue('EMAIL_DOMAIN'),
            email: this.getValue('EMAIL_EMAIL'),
            api_key: this.getValue('EMAIL_API_KEY'),
            auth_password: this.getValue('EMAIL_AUTH_PASSWORD'),
            host: this.getValue('EMAIL_HOST'),
            name: this.getValue('EMAIL_FROM_USER_NAME'),
        };
    }
    getFireBaseConfig() {
        return {
            firebase_client_email: this.getValue('FIREBASE_CLIENT_EMAIL'),
            firebase_private_key: this.getValue('FIREBASE_PRIVATE_KEY'),
        };
    }
    getIamportConfig() {
        return {
            iamport: this.getValue('IAMPORT'),
            iamport_key: this.getValue('IAMPORT_KEY'),
            iamport_secret_key: this.getValue('IAMPORT_SECRET_KEY'),
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map