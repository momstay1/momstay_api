"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const validationSchema_1 = require("./config/validationSchema");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const logger_middleware_1 = require("./logger/logger.middleware");
const throttler_1 = require("@nestjs/throttler");
const common_service_1 = require("./common/common.service");
const common_module_1 = require("./common/common.module");
const boards_module_1 = require("./boards/boards.module");
const board_contents_module_1 = require("./board-contents/board-contents.module");
const board_categories_module_1 = require("./board-categories/board-categories.module");
const board_selected_categories_module_1 = require("./board-selected-categories/board-selected-categories.module");
const groups_module_1 = require("./groups/groups.module");
const admin_users_module_1 = require("./admin-users/admin-users.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('/users');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
                load: [],
                isGlobal: true,
                validationSchema: validationSchema_1.validationSchema,
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            typeorm_1.TypeOrmModule.forRoot(),
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            boards_module_1.BoardsModule,
            board_contents_module_1.BoardContentsModule,
            board_categories_module_1.BoardCategoriesModule,
            board_selected_categories_module_1.BoardSelectedCategoriesModule,
            groups_module_1.GroupsModule,
            admin_users_module_1.AdminUsersModule,
        ],
        providers: [common_service_1.CommonService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map