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
const groups_module_1 = require("./groups/groups.module");
const file_module_1 = require("./file/file.module");
const user_sns_module_1 = require("./user-sns/user-sns.module");
const login_module_1 = require("./login/login.module");
const user_leave_module_1 = require("./user-leave/user-leave.module");
const user_dormant_module_1 = require("./user-dormant/user-dormant.module");
const email_module_1 = require("./email/email.module");
const product_module_1 = require("./product/product.module");
const product_option_module_1 = require("./product-option/product-option.module");
const product_info_module_1 = require("./product-info/product-info.module");
const metro_module_1 = require("./metro/metro.module");
const college_module_1 = require("./college/college.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('/**');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            boards_module_1.BoardsModule,
            board_contents_module_1.BoardContentsModule,
            groups_module_1.GroupsModule,
            user_sns_module_1.UserSnsModule,
            file_module_1.FileModule,
            login_module_1.LoginModule,
            user_leave_module_1.UserLeaveModule,
            user_dormant_module_1.UserDormantModule,
            email_module_1.EmailModule,
            product_module_1.ProductModule,
            product_option_module_1.ProductOptionModule,
            product_info_module_1.ProductInfoModule,
            metro_module_1.MetroModule,
            college_module_1.CollegeModule,
        ],
        providers: [common_service_1.CommonService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map