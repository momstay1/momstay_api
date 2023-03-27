import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessageHistoryEntity } from './entities/message-history.entity';
import { MessageTypeEntity } from './entities/message-type.entity';
import { AdminMessageController } from './admin-message.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { HttpModule } from '@nestjs/axios';
import { AdminMessageHistoryController } from './admin-message-history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      MessageHistoryEntity,
      MessageTypeEntity
    ]),
    SettingsModule,
    HttpModule
  ],
  controllers: [MessageController, AdminMessageController, AdminMessageHistoryController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule { }
