import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
    private readonly userService: UsersService,
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

    return { comment };
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
