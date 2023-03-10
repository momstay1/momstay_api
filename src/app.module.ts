import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';
import { BoardsModule } from './boards/boards.module';
import { BoardContentsModule } from './board-contents/board-contents.module';
import { BoardCategoriesModule } from './board-categories/board-categories.module';
import { BoardSelectedCategoriesModule } from './board-selected-categories/board-selected-categories.module';
import { GroupsModule } from './groups/groups.module';
import { FileModule } from './file/file.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';
import { UserSnsModule } from './user-sns/user-sns.module';
import { DefectModule } from './defect/defect.module';
import { LoginModule } from './login/login.module';
import { UserLeaveModule } from './user-leave/user-leave.module';
import { UserDormantModule } from './user-dormant/user-dormant.module';
import { EmailModule } from './email/email.module';
import { ProductModule } from './product/product.module';
import { ProductOptionModule } from './product-option/product-option.module';
import { ProductInfoModule } from './product-info/product-info.module';
import { MetroModule } from './metro/metro.module';
import { CollegeModule } from './college/college.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { OrderModule } from './order/order.module';
import { ReservationModule } from './reservation/reservation.module';
import { OrderTotalModule } from './order-total/order-total.module';
import { OrderProductModule } from './order-product/order-product.module';
import { PgDataModule } from './pg-data/pg-data.module';
import { PgNotiModule } from './pg-noti/pg-noti.module';
import { PgCancelModule } from './pg-cancel/pg-cancel.module';
import { MypageModule } from './mypage/mypage.module';
import { IamportService } from './iamport/iamport.service';
import { ReviewsModule } from './reviews/reviews.module';
import { DeviceModule } from './device/device.module';
import { CommentModule } from './comment/comment.module';
import { MembershipModule } from './membership/membership.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [],
      isGlobal: true,
      validationSchema,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    CommonModule,
    BoardsModule,
    BoardContentsModule,
    // BoardCategoriesModule,
    // BoardSelectedCategoriesModule,
    GroupsModule,
    UserSnsModule,
    FileModule,
    LoginModule,
    UserLeaveModule,
    UserDormantModule,
    EmailModule,
    ProductModule,
    ProductOptionModule,
    ProductInfoModule,
    MetroModule,
    CollegeModule,
    RefreshTokenModule,
    // DefectModule,
    // DashboardModule,
    SettingsModule,
    WishlistModule,
    PushNotificationModule,
    OrderModule,
    ReservationModule,
    OrderTotalModule,
    OrderProductModule,
    PgDataModule,
    PgNotiModule,
    PgCancelModule,
    MypageModule,
    ReviewsModule,
    DeviceModule,
    CommentModule,
    MembershipModule,
    BannerModule,
  ],
  providers: [CommonService, IamportService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/**');
  }
}
