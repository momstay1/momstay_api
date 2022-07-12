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
import { AdminUsersModule } from './admin-users/admin-users.module';
import { PlaceModule } from './place/place.module';
import { DefectModule } from './defect/defect.module';
import { DefectPlaceModule } from './defect-place/defect-place.module';

@Module({
  imports: [
    UsersModule,
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
    AuthModule,
    CommonModule,
    BoardsModule,
    BoardContentsModule,
    BoardCategoriesModule,
    BoardSelectedCategoriesModule,
    GroupsModule,
    AdminUsersModule,
    PlaceModule,
    DefectModule,
    DefectPlaceModule,
  ],
  providers: [CommonService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/users');
  }
}
