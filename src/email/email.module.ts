import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailCodeEntity } from './entities/email-code.entity';
import { EmailHistoryEntity } from './entities/email-history.entity';
import { EmailTmplEntity } from './entities/email-tmpl.entity';
import { AdminEmailController } from './admin-email.controller';
import { EmailEntity } from './entities/email.entity';
import { SettingsModule } from 'src/settings/settings.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmailEntity,
      EmailTmplEntity,
      EmailHistoryEntity,
      EmailCodeEntity,
    ]),
    SettingsModule,
    FileModule
  ],
  controllers: [AdminEmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
