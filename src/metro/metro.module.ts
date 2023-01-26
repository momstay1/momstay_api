import { Module } from '@nestjs/common';
import { MetroService } from './metro.service';
import { MetroController } from './metro.controller';

@Module({
  controllers: [MetroController],
  providers: [MetroService]
})
export class MetroModule {}
