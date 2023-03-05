import { Module } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MypageController } from './mypage.controller';
import { BoardContentsModule } from 'src/board-contents/board-contents.module';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
  imports: [
    BoardContentsModule,
    ReviewsModule,
  ],
  controllers: [MypageController],
  providers: [MypageService]
})
export class MypageModule {}
