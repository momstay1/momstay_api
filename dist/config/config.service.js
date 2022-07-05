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
            logging: Boolean(this.getValue('DB_LOGGING') == 'true'),
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map