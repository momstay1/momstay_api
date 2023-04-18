import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipHistoryEntity } from './entities/membership-history.entity';
import { AdminMembershipController } from './admin-membership.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { ExcelService } from 'src/excel/excel.service';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipHistoryEntity]),
    UsersModule,
    ProductModule,
    SettingsModule,
  ],
  controllers: [MembershipController, AdminMembershipController],
  providers: [MembershipService, ExcelService],
  exports: [MembershipService],
})
export class MembershipModule {}
