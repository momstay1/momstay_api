import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsEntity } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(BoardsEntity) private boardRepository: Repository<BoardsEntity>) { }

  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  findAll() {
    return `This action returns all boards`;
  }

  async findOne(id: string): Promise<BoardsEntity | undefined> {
    const board = await this.findBoard({ bd_id: id });
    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }

  async findBoard(where: any): Promise<BoardsEntity | undefined> {
    const board = await this.boardRepository.findOne(where);
    if (!board) {
      throw new NotFoundException('존재하지 않는 게시판 입니다.');
    }
    return board;
  }
}
