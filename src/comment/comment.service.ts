import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { BoardContentsService } from 'src/board-contents/board-contents.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

const statusRegistration = '2';
const statusDelete = '1';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    private readonly userService: UsersService,
    private readonly boardContentsService: BoardContentsService,
  ) { }

  async create(userInfo: UsersEntity, createCommentDto: CreateCommentDto) {

    // 회원 정보 가져오기
    const user = await this.userService.findId(get(userInfo, 'id'));

    const comment_data = {
      user: user,
      parentIdx: get(createCommentDto, 'parentIdx', 0),
      category: get(createCommentDto, 'category'),
      foreignIdx: get(createCommentDto, 'foreignIdx'),
      contents: get(createCommentDto, 'contents'),
      name: get(createCommentDto, 'name'),
    }
    if (get(createCommentDto, 'status', '')) comment_data['status'] = createCommentDto['status'];
    if (get(createCommentDto, 'password', '')) comment_data['password'] = createCommentDto['password'];
    if (get(createCommentDto, 'author', '')) comment_data['author'] = createCommentDto['author'];
    // 댓글 등록
    const commentEntity = await this.commentRepository.create(comment_data);
    const comment = await this.commentRepository.save(commentEntity);

    if (comment['category'] == 'bc') {
      // 답변 완료 상태로 변경
      await this.boardContentsService.statusAnswer(comment['foreignIdx']);
      // 댓글 개수 추가
      await this.boardContentsService.commentCountUp(comment['foreignIdx']);
    }

    return { comment };
  }

  async findAll(category: string, foreignIdx: number, options: PaginationOptions) {
    const { take, page } = options;
    const where = {
      status: statusRegistration,
      category,
      foreignIdx
    }
    const orderBy = {};
    orderBy['createdAt'] = 'DESC';

    const [results, total] = await this.commentRepository.findAndCount({
      where: where,
      order: orderBy,
      relations: ['user'],
      skip: (take * (page - 1) || 0),
      take: (take || 10)
    });

    const data = new Pagination({
      results,
      total,
      page,
    });
    return { data };

  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('댓글을 조회할 정보가 없습니다.');
    }
    const comment = await this.commentRepository.findOne({
      where: { idx: idx }
    });
    if (!get(comment, 'idx', '')) {
      throw new NotFoundException('조회된 댓글이 없습니다.');
    }
    return comment;
  }

  async update(idx: number, userInfo: UsersEntity, updateCommentDto: UpdateCommentDto) {
    const commentInfo = await this.findOneIdx(idx);

    if (commentInfo['status'] == +statusDelete) {
      throw new UnprocessableEntityException('삭제된 댓글입니다.');
    }

    commentInfo['status'] = get(updateCommentDto, ['status'], commentInfo['status']);
    commentInfo['contents'] = get(updateCommentDto, ['contents'], commentInfo['contents']);

    const comment = await this.commentRepository.save(commentInfo);

    return { comment };
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
