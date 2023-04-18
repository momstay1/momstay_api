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
const dashboard_module_1 = require("./dashboard/dashboard.module");
const settings_module_1 = require("./settings/settings.module");
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
const refresh_token_module_1 = require("./refresh-token/refresh-token.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const schedule_1 = require("@nestjs/schedule");
const push_notification_module_1 = require("./push-notification/push-notification.module");
const order_module_1 = require("./order/order.module");
const reservation_module_1 = require("./reservation/reservation.module");
const order_total_module_1 = require("./order-total/order-total.module");
const order_product_module_1 = require("./order-product/order-product.module");
const pg_data_module_1 = require("./pg-data/pg-data.module");
const pg_noti_module_1 = require("./pg-noti/pg-noti.module");
const pg_cancel_module_1 = require("./pg-cancel/pg-cancel.module");
const mypage_module_1 = require("./mypage/mypage.module");
const iamport_service_1 = require("./iamport/iamport.service");
const reviews_module_1 = require("./reviews/reviews.module");
const device_module_1 = require("./device/device.module");
const comment_module_1 = require("./comment/comment.module");
const membership_module_1 = require("./membership/membership.module");
const banner_module_1 = require("./banner/banner.module");
const banner_item_module_1 = require("./banner-item/banner-item.module");
const block_module_1 = require("./block/block.module");
const report_cumulative_module_1 = require("./report-cumulative/report-cumulative.module");
const popup_module_1 = require("./popup/popup.module");
const message_module_1 = require("./message/message.module");
const excel_module_1 = require("./excel/excel.module");
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
            schedule_1.ScheduleModule.forRoot(),
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
            refresh_token_module_1.RefreshTokenModule,
            dashboard_module_1.DashboardModule,
            settings_module_1.SettingsModule,
            wishlist_module_1.WishlistModule,
            push_notification_module_1.PushNotificationModule,
            order_module_1.OrderModule,
            reservation_module_1.ReservationModule,
            order_total_module_1.OrderTotalModule,
            order_product_module_1.OrderProductModule,
            pg_data_module_1.PgDataModule,
            pg_noti_module_1.PgNotiModule,
            pg_cancel_module_1.PgCancelModule,
            mypage_module_1.MypageModule,
            reviews_module_1.ReviewsModule,
            device_module_1.DeviceModule,
            comment_module_1.CommentModule,
            membership_module_1.MembershipModule,
            banner_module_1.BannerModule,
            banner_item_module_1.BannerItemModule,
            block_module_1.BlockModule,
            report_cumulative_module_1.ReportCumulativeModule,
            popup_module_1.PopupModule,
            message_module_1.MessageModule,
            excel_module_1.ExcelModule
        ],
        providers: [common_service_1.CommonService, iamport_service_1.IamportService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map