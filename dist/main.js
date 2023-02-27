"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const config_service_1 = require("./config/config.service");
const common_utils_1 = require("./common/common.utils");
async function bootstrap() {
    await makeOrmConfig();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    common_utils_1.commonUtils.setupSwagger(app);
    await app.listen(3111);
}
async function makeOrmConfig() {
    const configService = new config_service_1.ConfigService(process.env);
    const typeormConfig = configService.getTypeOrmConfig();
    if (fs.existsSync('ormconfig.json')) {
        fs.unlinkSync('ormconfig.json');
    }
    fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
}
bootstrap();
//# sourceMappingURL=main.js.map