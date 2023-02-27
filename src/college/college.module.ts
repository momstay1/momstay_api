import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeEntity } from './entities/college.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollegeEntity]),
  ],
  controllers: [CollegeController],
  providers: [CollegeService],
  exports: [CollegeService],
})
export class CollegeModule { }
