import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './entities/block.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockEntity]),
    UsersModule
  ],
  controllers: [BlockController],
  providers: [BlockService],
  exports: [BlockService]
})
export class BlockModule { }
