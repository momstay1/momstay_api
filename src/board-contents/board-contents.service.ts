import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { get, keyBy } from 'lodash';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { GroupsService } from 'src/groups/groups.service';
import { commonBcrypt } from 'src/common/common.bcrypt';

@Injectable()
export class BoardContentsService {
  constructor(
    @InjectRepository(BoardContentsEntity) private bcRepository: Repository<BoardContentsEntity>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
    private readonly bscatsService: BoardSelectedCategoriesService,
    private readonly bcatsService: BoardCategoriesService,
    private readonly AdminService: AdminUsersService,
  ) { }

  /****************** 
   * 
   * 사용자 기능 
   * 
  *******************/
  // 게시글 생성
  async create(userInfo, bc: CreateBoardContentDto) {
    // 게시판 정보 가져오기
    const board = await this.boardsService.findBoard({ bd_idx: bc.bd_idx });
    // 카테고리정보 가져오기
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In(bc.category) }
    });
    const write_auth = board.bd_write_auth.split("|");

    // 회원정보 가져오기
    if (!['root', 'admin'].includes(userInfo.user_group)) {
      const user = await this.usersService.findOne(userInfo.user_id);
      // 게시글 쓰기 권한 여부 확인
      if (!write_auth.includes(get(user, ['user_group', 'grp_id']))) {
        throw new UnauthorizedException('권한이 없습니다.');
      }
      bc.user_idx = get(user, ['user_idx']).toString();
    } else {
      const admin = await this.AdminService.findOne(userInfo.user_id);
      bc.admin_idx = get(admin, ['admin_idx']).toString();
    }
    bc.bd_idx = bc.bd_idx;

    // 게시글 저장
    const boardContent = await this.saveBoardContent(bc)

    // 셀렉트 카테고리 저장하기
    boardContent.bscats = [];
    for (const key in bcats) {
      boardContent.bscats.push(
        await this.bscatsService.saveToBscat(bcats[key], boardContent)
      );
    }
    return boardContent;
  }

  // 게시글 상태 일괄 변경 (수정, 삭제)
  async statusChange(statusChange) {
    console.log({ statusChange });
    await this.bcRepository.createQueryBuilder()
      .update(BoardContentsEntity)
      .set({ bc_status: Number(statusChange.status) })
      .where(" bc_idx IN (:bc_idx)", { bc_idx: statusChange.bc_idxs })
      .execute()
  }

  // 게시글 리스트 가져오기
  async findCategoryAll(idx, category: string, options: PaginationOptions) {
    const { take, page } = options;

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) }
    });

    const [results, total] = await this.bcRepository.findAndCount({
      order: { bc_createdAt: 'DESC' },
      where: (qb) => {
        qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: idx })
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx })
        }
        qb.andWhere('bc_status = :bc_status', { bc_status: bcConstants.status.registration })
        qb.andWhere('bc_type IN (:bc_type)', { bc_type: this.getNoneNoticeType() })
      },
      relations: ['user', 'board', 'bscats', 'admin'],
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

  // 공지사항 게시글 리스트 가져오기
  async findNoticeCategoryAll(bd_idx: string, category: string) {
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) }
    });
    return await this.bcRepository.find({
      order: { bc_createdAt: 'DESC' },
      where: (qb) => {
        qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: bd_idx })
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx })
        }
        qb.andWhere('bc_status = :bc_status', { bc_status: bcConstants.status.registration })
        qb.andWhere('bc_type = :bc_type', { bc_type: bcConstants.type.notice })
      },
      relations: ['user', 'board', 'bscats', 'admin'],
    });
  }

  async findOne(bc_idx: number) {
    const bc = await this.findIndex(bc_idx);
    if (bc.bc_status !== bcConstants.status.registration) {
      throw new NotAcceptableException('접근 할 수 없는 게시글 입니다.');
    }
    return bc;
  }

  async findIndex(idx: number) {
    const bc = await this.bcRepository.findOne({
      where: { bc_idx: idx },
      relations: ['user', 'board', 'bscats', 'admin']
    });
    if (!bc) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }
    return bc;
  }

  async update(userInfo, bc_idx: number, updateBoardContentDto: UpdateBoardContentDto) {
    // 게시판 정보 가져오기
    const board = await this.boardsService.findBoard({ bd_idx: updateBoardContentDto.bd_idx });
    // 게시글 정보 가져오기
    const bc = await this.findIndex(bc_idx);
    // 카테고리정보 가져오기 (bcat_idx를 키값으로 재정렬)
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In(updateBoardContentDto.category) }
    });

    const write_auth = board.bd_write_auth.split("|");
    // 게시글 쓰기 권한 여부 확인
    if (!['root', 'admin'].includes(userInfo.user_group)) {
      // 회원정보 가져오기
      const user = await this.usersService.findOne(userInfo.user_id);
      // 쓰기 권한 혹은 자신의 글이 아닌 경우
      if (!write_auth.includes(get(userInfo, ['user_group', 'grp_id']))
        || get(bc, ['user', 'user_idx']) != get(user, ['user_idx'])) {
        throw new UnauthorizedException('권한이 없습니다.');
      }
    }
    bc.bc_idx = bc_idx;
    bc.bc_status = +get(updateBoardContentDto, ['status'], 2);
    bc.bc_type = +get(updateBoardContentDto, ['type'], 1);
    bc.bc_write_name = get(updateBoardContentDto, ['write_name'], '');
    bc.bc_title = get(updateBoardContentDto, ['title'], '');
    bc.bc_link = get(updateBoardContentDto, ['link'], '');
    bc.bc_content = get(updateBoardContentDto, ['content'], '');

    // 게시글 저장
    const boardContent = await this.updateBoardContent(bc)

    // 카테고리 수정
    boardContent.bscats = await this.bscatsChange(bcats, boardContent);

    return boardContent;
  }

  /****************** 
   * 
   * 관리자 기능 
   * 
  *******************/

  // 관리자용 게시글 리스트 가져오기
  async adminFindCategoryAll(idx, category: string, options: PaginationOptions) {
    const { take, page } = options;

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) }
    });

    const [results, total] = await this.bcRepository.findAndCount({
      order: { bc_createdAt: 'DESC' },
      where: (qb) => {
        qb.where('bc_bd_idx = :bc_bd_idx', { bc_bd_idx: idx })
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('bscat_bcat_idx = :bcat_idx', { bcat_idx: bcats[0].bcat_idx })
        }
        // qb.andWhere('bc_type IN (:bc_type)', { bc_type: this.getNoneNoticeType() })
      },
      relations: ['user', 'board', 'bscats', 'admin'],
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

  /****************** 
   * 
   * 기타 기능
   * 
  *******************/

  // 게시글 카테고리 수정
  private async bscatsChange(updateBscats, bc) {
    const bscats = [];
    const deleteBscats = [];

    const bcats = keyBy(updateBscats, o => {
      return o.bcat_idx;
    });

    for (const key in bc.bscats) {
      if (bcats[bc.bscats[key].bscat_bcat_idx]) {
        delete bcats[bc.bscats[key].bscat_bcat_idx];
      } else {
        deleteBscats.push(bc.bscats[key].bscat_idx);
      }
    }

    if (deleteBscats.length > 0) {
      this.bscatsService.removes(deleteBscats);
    }

    // 셀렉트 카테고리 저장하기
    for (const key in bcats) {
      bscats.push(
        await this.bscatsService.saveToBscat(bcats[key], bc)
      );
    }
    return bscats;
  }

  // 게시글 등록
  private async saveBoardContent(createBoardContentDto): Promise<any> {
    const addPrefixBcDto = commonUtils.addPrefix(bcConstants.prefix, createBoardContentDto);
    const bc = {
      user: get(createBoardContentDto, ['user_idx']),
      admin: get(createBoardContentDto, ['admin_idx']),
      board: get(createBoardContentDto, ['bd_idx'], 0),
      ...addPrefixBcDto,
    }
    if (get(createBoardContentDto, ['password'])) {
      bc.bc_password = await commonBcrypt.setBcryptPassword(get(createBoardContentDto, 'password'));
    }
    const newBc = await this.bcRepository.save(bc);
    return await this.bcRepository.save(newBc);
  }

  // 게시글 수정
  private async updateBoardContent(updateBoardContentDto): Promise<any> {
    const bc = {
      user: get(updateBoardContentDto, ['user_idx']),
      admin: get(updateBoardContentDto, ['admin_idx']),
      board: get(updateBoardContentDto, ['bd_idx'], 0),
      ...updateBoardContentDto,
    }
    if (get(updateBoardContentDto, ['password'])) {
      bc.bc_password = await commonBcrypt.setBcryptPassword(get(updateBoardContentDto, 'password'));
    }
    const newBc = await this.bcRepository.save(bc);
    return await this.bcRepository.save(newBc);
  }

  // 숨김처리할 개인정보
  getPrivateColumn(): any[] {
    const userPrivateColumn = this.usersService.getPrivateColumn();
    const adminPrivateColumn = this.AdminService.getAdminPrivateColumn();
    return [
      ...bcConstants.privateColumn,
      ...userPrivateColumn,
      ...adminPrivateColumn
    ];
  }

  // 공지사항이 아닌 게시글 타입
  getNoneNoticeType(): number[] {
    const arr: number[] = [];
    arr.push(bcConstants.type.basic);
    arr.push(bcConstants.type.secret);
    arr.push(bcConstants.type.link);
    return arr;
  }

  // 비회원 글쓰기
  // 비회원 글수정
  // 비회원 글삭제
}
