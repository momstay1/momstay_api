import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCategoriesService } from 'src/board-categories/board-categories.service';
import { BoardSelectedCategoriesService } from 'src/board-selected-categories/board-selected-categories.service';
import { BoardsService } from 'src/boards/boards.service';
import { UsersService } from 'src/users/users.service';
import { ExcelService } from 'src/excel/excel.service';
import { In, Repository } from 'typeorm';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { BoardContentsEntity } from './entities/board-content.entity';
import { bcConstants } from './constants';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { get, isArray, keyBy, values } from 'lodash';
import { GroupsService } from 'src/groups/groups.service';
import { commonBcrypt } from 'src/common/common.bcrypt';
import { EmailService } from 'src/email/email.service';
import { SettingsService } from 'src/settings/settings.service';

const inquiryIdx = 5;
@Injectable()
export class BoardContentsService {
  constructor(
    @InjectRepository(BoardContentsEntity)
    private bcRepository: Repository<BoardContentsEntity>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
    private readonly bscatsService: BoardSelectedCategoriesService,
    private readonly bcatsService: BoardCategoriesService,
    private readonly excelService: ExcelService,
    private readonly emailService: EmailService,
    private readonly settingsService: SettingsService,
  ) { }

  /******************
   *
   * 사용자 기능
   *
   *******************/
  // 게시글 생성
  async create(userInfo, bc: CreateBoardContentDto) {
    // 게시판 정보 가져오기
    const board = await this.boardsService.findBoard({ idx: bc.bd_idx });
    const write_auth = board.write_auth.split('|');

    // 회원정보 가져오기
    const user = await this.usersService.findId(userInfo.id);

    // 게시글 쓰기 권한 여부 확인
    const writeAuth = await commonUtils.authCheck(
      write_auth,
      get(user, ['group', 'id']),
    );
    if (writeAuth.length <= 0) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    bc.user_idx = get(user, ['idx']).toString();
    bc.bd_idx = bc.bd_idx;

    // 게시글 저장
    const boardContent = await this.saveBoardContent(bc);

    if (bc.category.length) {
      // 카테고리정보 가져오기
      const bcats = await this.bcatsService.searching({
        where: { bcat_id: In(bc.category) },
      });
      // 셀렉트 카테고리 저장하기
      boardContent.bscats = [];
      for (const key in bcats) {
        boardContent.bscats.push(
          await this.bscatsService.saveToBscat(bcats[key], boardContent),
        );
      }
    }

    const site = await this.settingsService.find('site');
    if (board.idx == inquiryIdx && get(site, ['site_ko_email', 'set_value'], '')) {
      // 1:1 문의 관리자 메일 발송
      const { mail, email_tmpl } = await this.emailService.mailSettings(
        { type: 'board', group: 'admin', code: 'inquiry', lang: 'ko' },
        {
          board_title: board.name
        }
      );
      if (mail != '' && email_tmpl != '') {
        await this.emailService.sendMail(site.site_ko_email.set_value, mail.title, email_tmpl);
      }
    }

    return boardContent;
  }

  // 게시글 상태 일괄 변경 (수정, 삭제)
  async statusChange(statusChange) {
    console.log({ statusChange });
    await this.bcRepository
      .createQueryBuilder()
      .update(BoardContentsEntity)
      .set({ status: Number(statusChange.status) })
      .where(' idx IN (:bc_idx)', { bc_idx: statusChange.bc_idxs })
      .execute();
  }

  // 게시글 답변 완료 상태 변경
  async statusAnswer(bcIdx: number, answerContent: string) {
    const bc = await this.findIndex(bcIdx);
    // 답변 대기 상태인 게시글만 답변 완료 상태로 변경
    if (bc['status'] == bcConstants.status.answerWait) {
      bc['status'] = bcConstants.status.answerComplete;
      await this.bcRepository.save(bc);
      if (bc.board.idx == inquiryIdx && get(bc, ['user', 'email'], '')) {
        // 1:1 문의 답변 메일 발송
        const { mail, email_tmpl } = await this.emailService.mailSettings(
          { type: 'board', group: 'guest', code: 'inquiry', lang: bc.user.language },
          {
            inquiry_content: bc.content,
            answer_content: answerContent
          }
        );
        if (mail != '' && email_tmpl != '') {
          await this.emailService.sendMail(bc.user.email, mail.title, email_tmpl);
        }
      }
    }
  }

  // 게시글 답변 완료 상태 변경
  async commentCountUp(bcIdx: number) {
    const bc = await this.findIndex(bcIdx);
    bc['commentCount']++;
    await this.bcRepository.save(bc);
  }

  // 게시글 상태 일괄 변경 (수정, 삭제)
  async typeChange(typeChange) {
    console.log({ typeChange });
    await this.bcRepository
      .createQueryBuilder()
      .update(BoardContentsEntity)
      .set({ type: Number(typeChange.type) })
      .where(' idx IN (:bc_idx)', { bc_idx: typeChange.bc_idxs })
      .execute();
  }

  // 게시글 리스트 가져오기
  async findCategoryAll(
    bd_idx,
    category: string,
    options: PaginationOptions,
    order,
    search: string[],
  ) {
    const { take, page } = options;

    // 리스트 권한 체크
    // // 게시판 정보 가져오기
    // const board = await this.boardsService.findBoard({ idx: bd_idx });
    // const lists_auth = board.lists_auth.split("|");
    // const listsAuth = await commonUtils.authCheck(lists_auth, get(user, ['group', 'id']));
    // if (listsAuth.length <= 0) {
    //   throw new UnauthorizedException('권한이 없습니다.');
    // }

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) },
    });

    const where = commonUtils.searchSplit(search);

    const order_by = commonUtils.orderSplit(order, '');
    order_by['createdAt'] = get(order_by, ['createdAt'], 'DESC');

    const [results, total] = await this.bcRepository.findAndCount({
      order: order_by,
      where: (qb) => {
        qb.where('`BoardContentsEntity__board`.`idx` = :bd_idx', {
          bd_idx: bd_idx,
        });
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
            bcat_idx: bcats[0].bcat_idx,
          });
        }
        if (get(where, 'status', '')) {
          qb.andWhere('`BoardContentsEntity`.`status` IN (:status)', {
            status: isArray(get(where, 'status'))
              ? get(where, 'status')
              : [get(where, 'status')],
          });
        } else {
          qb.andWhere('`BoardContentsEntity`.`status` = :status', {
            status: bcConstants.status.registration,
          });
        }
        // qb.andWhere('`BoardContentsEntity`.`status` = :status', { status: bcConstants.status.registration })
        qb.andWhere('`BoardContentsEntity`.`type` IN (:type)', {
          type: this.getNoneNoticeType(),
        });
      },
      relations: ['user', 'board', 'bscats'],
      take: take,
      skip: take * (page - 1),
    });

    return {
      bcats: bcats,
      bc: new Pagination({
        results,
        total,
        page,
      }),
    };
  }

  async findUserCategoryAll(
    bd_idx,
    category: string,
    options: PaginationOptions,
    order,
    userInfo,
  ) {
    const { take, page } = options;

    const user = await this.usersService.findId(userInfo.id);

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) },
    });

    const order_by = commonUtils.orderSplit(order, '');
    order_by['createdAt'] = get(order_by, ['createdAt'], 'DESC');
    const [results, total] = await this.bcRepository.findAndCount({
      order: order_by,
      where: (qb) => {
        qb.where('`BoardContentsEntity__board`.`idx` = :bd_idx', {
          bd_idx: bd_idx,
        });
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
            bcat_idx: bcats[0].bcat_idx,
          });
        }
        qb.andWhere('`BoardContentsEntity`.`status` IN (:status)', {
          status: [
            bcConstants.status.registration,
            bcConstants.status.answerWait,
            bcConstants.status.answerComplete,
          ],
        });
        qb.andWhere('`BoardContentsEntity`.`type` IN (:type)', {
          type: this.getNoneNoticeType(),
        });
        qb.andWhere('`BoardContentsEntity__user`.`idx` IN (:userIdx)', {
          userIdx: user.idx,
        });
      },
      relations: ['user', 'board', 'bscats'],
      take: take,
      skip: take * (page - 1),
    });

    return {
      bcats: bcats,
      bc: new Pagination({
        results,
        total,
        page,
      }),
    };
  }

  // 공지사항 게시글 리스트 가져오기
  async findNoticeCategoryAll(bd_idx: string, category: string) {
    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) },
    });
    return await this.bcRepository.find({
      order: { createdAt: 'DESC' },
      where: (qb) => {
        qb.where('`BoardContentsEntity__board`.`idx` = :bc_bd_idx', {
          bc_bd_idx: bd_idx,
        });
        if (get(bcats, [0, 'bcat_idx'])) {
          qb.andWhere('`BoardContentsEntity__bscats`.`bscat_idx` = :bcat_idx', {
            bcat_idx: bcats[0].bcat_idx,
          });
        }
        qb.andWhere('`BoardContentsEntity`.`status` = :bc_status', {
          bc_status: bcConstants.status.registration,
        });
        qb.andWhere('`BoardContentsEntity`.`type` = :bc_type', {
          bc_type: bcConstants.type.notice,
        });
      },
      relations: ['user', 'board', 'bscats'],
    });
  }

  async findOne(bcIdx: number) {
    const bc = await this.findIndex(bcIdx);
    if (
      [bcConstants.status.delete, bcConstants.status.uncertified].includes(
        bc.status,
      )
    ) {
      throw new NotAcceptableException('접근 할 수 없는 게시글 입니다.');
    }
    bc.count = await this.countUp(bc.idx, bc.count);
    return bc;
  }

  async findIndex(idx: number) {
    const bc = await this.bcRepository.findOne({
      where: { idx: idx },
      relations: ['user', 'board', 'bscats'],
    });
    if (!bc) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }
    return bc;
  }

  async findBdBcIndex(bcIdx: number) {
    const bc = await this.bcRepository.findOne({
      where: { idx: bcIdx },
      relations: ['user', 'board', 'bscats'],
    });
    if (!bc) {
      throw new NotFoundException('존재하지 않는 게시글 입니다.');
    }
    return bc;
  }

  async update(
    userInfo,
    bcIdx: number,
    updateBoardContentDto: UpdateBoardContentDto,
  ) {
    // 게시판 정보 가져오기
    const board = await this.boardsService.findBoard({
      idx: updateBoardContentDto.bd_idx,
    });
    // 게시글 정보 가져오기
    const bc = await this.findIndex(bcIdx);

    const user = await this.usersService.findId(userInfo.id);
    // 게시글 쓰기 권한 여부 확인
    const adminAuth = await commonUtils.isAdmin(get(user, ['group', 'id']));
    if (!adminAuth) {
      // 쓰기 권한 혹은 자신의 글이 아닌 경우
      const write_auth = board.write_auth.split('|');
      const user_auth = await commonUtils.authCheck(
        write_auth,
        get(userInfo, ['group']),
      );
      if (
        user_auth.length <= 0 ||
        get(bc, ['user', 'idx']) != get(user, ['idx'])
      ) {
        throw new UnauthorizedException('권한이 없습니다.');
      }
    }

    bc.idx = bcIdx;
    bc.status = +get(updateBoardContentDto, ['status'], 2);
    bc.type = +get(updateBoardContentDto, ['type'], 1);
    bc.writer = get(updateBoardContentDto, ['writer'], '');
    bc.title = get(updateBoardContentDto, ['title'], '');
    bc.link = get(updateBoardContentDto, ['link'], '');
    bc.content = get(updateBoardContentDto, ['content'], '');

    // 게시글 저장
    const boardContent = await this.updateBoardContent(bc);

    // 카테고리 수정
    if (get(updateBoardContentDto, ['category', 'length']) > 0) {
      // 카테고리정보 가져오기 (bcat_idx를 키값으로 재정렬)
      const bcats = await this.bcatsService.searching({
        where: { bcat_id: In(updateBoardContentDto.category) },
      });
      boardContent.bscats = await this.bscatsChange(bcats, boardContent);
    }

    return boardContent;
  }

  async countUp(bc_idx, bc_count: number) {
    // 게시글 저장
    await this.bcRepository
      .createQueryBuilder()
      .update(BoardContentsEntity)
      .set({ count: ++bc_count })
      .where(' idx IN (:bc_idx)', { bc_idx: [bc_idx] })
      .execute();

    return bc_count;
  }

  /******************
   *
   * 관리자 기능
   *
   *******************/

  // 관리자용 게시글 리스트 가져오기
  async adminFindCategoryAll(
    bd_idx,
    category: string,
    options: PaginationOptions,
    search: string[],
    order,
  ) {
    const { take, page } = options;

    const bcats = await this.bcatsService.searching({
      where: { bcat_id: In([category]) },
    });

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', values(bcConstants.status));
    console.log({ where });

    const alias = 'bc';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );
    console.log({ order_by });

    const [results, total] = await this.bcRepository
      .createQueryBuilder('bc')
      .leftJoinAndSelect('bc.user', 'user')
      .leftJoinAndSelect('bc.board', 'board')
      .leftJoinAndSelect('bc.bscats', 'bscats')
      .leftJoinAndSelect('user.group', 'group')
      .where((qb) => {
        qb.where('`board`.idx = :bd_idx', { bd_idx: bd_idx });
        qb.andWhere('`bc`.status IN (:status)', {
          status: isArray(where['status'])
            ? where['status']
            : [where['status']],
        });
        get(where, 'name', '') &&
          qb.andWhere('`user`.name LIKE :name', {
            name: '%' + where['name'] + '%',
          });
        get(where, 'id', '') &&
          qb.andWhere('`user`.id LIKE :id', { id: '%' + where['id'] + '%' });
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    return {
      bcats: bcats,
      bc: new Pagination({
        results,
        total,
        page,
      }),
    };
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

    const bcats = keyBy(updateBscats, (o) => {
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
      bscats.push(await this.bscatsService.saveToBscat(bcats[key], bc));
    }
    return bscats;
  }

  // 게시글 등록
  private async saveBoardContent(createBoardContentDto): Promise<any> {
    const bc = {
      user: get(createBoardContentDto, ['user_idx']),
      board: get(createBoardContentDto, ['bd_idx'], 0),
      ...createBoardContentDto,
    };
    if (get(createBoardContentDto, ['password'])) {
      bc.bc_password = await commonBcrypt.setBcryptPassword(
        get(createBoardContentDto, 'password'),
      );
    }
    const newBc = await this.bcRepository.save(bc);
    return await this.bcRepository.save(newBc);
  }

  // 게시글 수정
  private async updateBoardContent(updateBoardContentDto): Promise<any> {
    const bc = {
      user: get(updateBoardContentDto, ['user_idx']),
      board: get(updateBoardContentDto, ['bd_idx'], 0),
      ...updateBoardContentDto,
    };
    if (get(updateBoardContentDto, ['password'])) {
      bc.bc_password = await commonBcrypt.setBcryptPassword(
        get(updateBoardContentDto, 'password'),
      );
    }
    const newBc = await this.bcRepository.save(bc);
    return await this.bcRepository.save(newBc);
  }

  // 숨김처리할 개인정보
  getPrivateColumn(): any[] {
    const userPrivateColumn = this.usersService.getPrivateColumn();
    // const adminPrivateColumn = this.AdminService.getAdminPrivateColumn();
    return [
      ...bcConstants.privateColumn,
      ...userPrivateColumn,
      // ...adminPrivateColumn
    ];
  }

  // 공지사항이 아닌 게시글 타입
  getNoneNoticeType(): number[] {
    const arr: number[] = [];
    arr.push(bcConstants.type.basic);
    arr.push(bcConstants.type.secret);
    arr.push(bcConstants.type.link);
    arr.push(bcConstants.type.event);
    arr.push(bcConstants.type.new);
    return arr;
  }

  // 비회원 글쓰기
  // 비회원 글수정
  // 비회원 글삭제

  // 관리자용 게시글 리스트 엑셀 생성
  async createExcel(
    bd_idx,
    category: string,
    options: PaginationOptions,
    search: string[],
    order,
  ) {
    const boardContents = await this.adminFindCategoryAll(
      bd_idx,
      category,
      options,
      search,
      order,
    );
    if (!boardContents) {
      throw new NotFoundException(
        'board-contents.service.excel: 다운로드할 데이터가 없습니다.',
      );
    }
    return this.excelService.createExcel(boardContents['bc'], {
      type: `board_${bd_idx}`,
    });
  }
}
