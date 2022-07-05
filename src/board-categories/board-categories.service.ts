import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCategoriesEntity } from './entities/board-categories.entity';

@Injectable()
export class BoardCategoriesService {
  constructor(@InjectRepository(BoardCategoriesEntity) private bcatRepository: Repository<BoardCategoriesEntity>) { }

  async findOne(idx: number): Promise<BoardCategoriesEntity | undefined> {
    const bcat = await this.bcatRepository.findOne({ bcat_idx: idx });
    if (!bcat) {
      throw new NotFoundException('존재하지 않는 카테고리 입니다.');
    }

    return bcat;
  }

  async searching(sqlQuery: any) {
    const bcat = await this.bcatRepository.find(sqlQuery);
    if (!bcat) {
      throw new NotFoundException('존재하지 않는 카테고리 입니다.');
    }
    return bcat;
  }

  async findAll() {
    return await this.bcatRepository.find({
      where: { bcat_status: 1 }
    });
  }
}

