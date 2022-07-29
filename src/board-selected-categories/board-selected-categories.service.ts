import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { Repository } from 'typeorm';
import { BoardSelectedCategoriesEntity } from './entities/board-selected-categories.entity';

@Injectable()
export class BoardSelectedCategoriesService {
  constructor(
    @InjectRepository(BoardSelectedCategoriesEntity) private bscatsRepository: Repository<BoardSelectedCategoriesEntity>,
    private readonly bcatsService: BoardCategoriesService,
  ) { }

  async create(createbscatContentDto: BoardSelectedCategoriesEntity) {
    const bscat = await this.bscatsRepository.save(createbscatContentDto);
    bscat.bcats = await this.bcatsService.findOne(bscat.bscat_bcat_idx);
    delete bscat.bc;
    return bscat;
  }

  async saveToBscat(bcat, boardContent) {
    const bscatsEntity = new BoardSelectedCategoriesEntity();
    bscatsEntity.bscat_bcat_idx = bcat.bcat_idx;
    bscatsEntity.bscat_bc_idx = boardContent.bc_idx;
    bscatsEntity.bcats = bcat;
    bscatsEntity.bc = boardContent;
    return await this.create(bscatsEntity);
  }

  async removes(idxs) {
    if (idxs.length <= 0) {
      throw new NotFoundException('삭제할 정보가 없습니다.');
    }
    await this.bscatsRepository.createQueryBuilder()
      .delete()
      .where(" bscat_idx IN (:idxs)", { idxs: idxs })
      .execute()
  }
}
