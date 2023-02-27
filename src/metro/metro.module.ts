import { Module } from '@nestjs/common';
import { MetroService } from './metro.service';
import { MetroController } from './metro.controller';
import { MetroEntity } from './entities/metro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetroEntity]),
  ],
  controllers: [MetroController],
  providers: [MetroService],
  exports: [MetroService],
})
export class MetroModule { }
