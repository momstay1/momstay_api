import { Module } from '@nestjs/common';
import { BoardContentsService } from './board-contents.service';
import { BoardContentsController } from './board-contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardContentsEntity } from './entities/board-content.entity';
import { UsersModule } from 'src/users/users.module';
import { BoardCategoriesModule } from 'src/board-categories/board-categories.module';
import { BoardsModule } from 'src/boards/boards.module';
import { BoardSelectedCategoriesModule } from 'src/board-selected-categories/board-selected-categories.module';
import { NoticeContentsController } from './notice-contents.controller';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { GroupsModule } from 'src/groups/groups.module';
import { AdminBoardContentsController } from './admin-board-contents.controller';
import { ExcelService } from 'src/excel/excel.service';
import { EmailModule } from 'src/email/email.module';
import { SettingsModule } from 'src/settings/settings.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardContentsEntity]),
    UsersModule,
    BoardsModule,
    BoardSelectedCategoriesModule,
    BoardCategoriesModule,
    AdminUsersModule,
    GroupsModule,
    EmailModule,
    SettingsModule,
    MessageModule
  ],
  controllers: [
    BoardContentsController,
    AdminBoardContentsController,
    NoticeContentsController,
  ],
  providers: [BoardContentsService, ExcelService],
  exports: [BoardContentsService],
})
export class BoardContentsModule { }
