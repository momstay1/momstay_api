import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipHistoryEntity } from './entities/membership-history.entity';
import { AdminMembershipController } from './admin-membership.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipHistoryEntity]),
    UsersModule,
    ProductModule
  ],
  controllers: [MembershipController, AdminMembershipController],
  providers: [MembershipService],
  exports: [MembershipService]
})
export class MembershipModule { }
