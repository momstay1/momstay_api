import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailCodeEntity } from './entities/email-code.entity';
import { EmailHistoryEntity } from './entities/email-history.entity';
import { EmailTmplEntity } from './entities/email-tmpl.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailTmplEntity, EmailHistoryEntity, EmailCodeEntity]),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
