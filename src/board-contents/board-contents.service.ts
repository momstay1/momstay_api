import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { BoardSelectedCategoriesService } from 'src/board-selected-categories/board-selected-categories.service';
import { BoardsService } from 'src/boards/boards.service';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
import { bcConstants } from './constants';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { constants } from 'buffer';
import { isArray } from 'lodash';

@Injectable()
export class BoardContentsService {
  constructor(
    @InjectRepository(BoardContentsEntity) private bcRepository: Repository<BoardContentsEntity>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
    private readonly bscatsService: BoardSelectedCategoriesService,
    private readonly bcatsService: BoardCategoriesService
  ) { }

  async create(bd_idx: number, user_id, createBoardContentDto: CreateBoardContentDto) {
    // 회원정보 가져오기
    const user = await this.usersService.findOne(user_id);
    // 카테고리정보 가져오기
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In(createBoardContentDto.category) }
    });

    // 게시판 정보 가져오기
    const board = await this.boardsService.findBoard({ bd_idx: bd_idx });

    // 게시글 저장
    const boardContent = await this.saveBoardContent({ user, board }, createBoardContentDto)

    // 셀렉트 카테고리 저장하기
    boardContent.bscats = [];
    for (const key in bcats) {
      boardContent.bscats.push(
        await this.bscatsService.saveToBscat(bcats[key], boardContent)
      );
    }
    return boardContent;
  }

  async findAll(options: PaginationOptions) {
    const { take, page } = options;
    const [results, total] = await this.bcRepository.findAndCount({
      order: { bc_createdAt: 'DESC' },
      where: { bc_status: bcConstants.status.registration, bc_type: In(this.getNoneNoticeType()) },
      relations: ['user', 'board', 'bscats'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findNoticeAll() {
    return await this.bcRepository.find({
      order: { bc_createdAt: 'DESC' },
      where: { bc_status: bcConstants.status.registration, bc_type: bcConstants.type.notice },
      relations: ['user', 'board', 'bscats']
    });
  }

  async findCategoryAll(options: PaginationOptions, category: string) {
    const { take, page } = options;

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) }
    });

    const [results, total] = await this.bcRepository.findAndCount({
      order: { bc_createdAt: 'DESC' },
      where: (qb) => {
        qb.where('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx })
        qb.andWhere('bc_status = :bc_status', { bc_status: bcConstants.status.registration })
        qb.andWhere('bc_type IN (:bc_type)', { bc_type: this.getNoneNoticeType() })
      },
      relations: ['user', 'board', 'bscats'],
      take: take,
      skip: take * (page - 1)
    });

    return {
      bcats: bcats,
      bc: new Pagination({
        results,
        total,
      })
    }
  }

  async findNoticeCategoryAll(category: string) {
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) }
    });
    return await this.bcRepository.find({
      order: { bc_createdAt: 'DESC' },
      where: (qb) => {
        qb.where('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx })
        qb.andWhere('bc_status = :bc_status', { bc_status: bcConstants.status.registration })
        qb.andWhere('bc_type = :bc_type', { bc_type: bcConstants.type.notice })
      },
      relations: ['user', 'board', 'bscats'],
    });
  }

  async findOne(idx: number) {
    const bc = await this.bcRepository.findOne({
      where: { bc_idx: idx },
      relations: ['user', 'board', 'bscats']
    });
    if (!bc) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }
    if (bc['bc_status'] !== bcConstants.status.registration) {
      throw new NotAcceptableException('접근 할 수 없는 게시글 입니다.');
    }
    return bc;
  }

  update(id: number, updateBoardContentDto: UpdateBoardContentDto) {
    return `This action updates a #${id} boardContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardContent`;
  }

  //회원 정보 저장
  private async saveBoardContent(relation, createBoardContentDto): Promise<any> {
    const addPrefixBcDto = commonUtils.addPrefix(bcConstants.prefix, createBoardContentDto);
    const bc = {
      bc_bd_idx: relation.board.bd_idx,
      bc_user_idx: relation.user.user_idx,
      bc_status: bcConstants.status.registration,
      ...addPrefixBcDto,
      ...relation,
    }
    const newBc = await this.bcRepository.save(bc);
    return await this.bcRepository.save(newBc);
  }

  getPrivateColumn(): any[] {
    const userPrivateColumn = this.usersService.getPrivateColumn();
    return [
      ...bcConstants.privateColumn,
      ...userPrivateColumn
    ];
  }

  getNoneNoticeType(): number[] {
    const arr: number[] = [];
    arr.push(bcConstants.type.basic);
    arr.push(bcConstants.type.secret);
    arr.push(bcConstants.type.link);
    return arr;
  }
}
