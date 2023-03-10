import { BoardContentsService } from 'src/board-contents/board-contents.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
export declare class CommentService {
    private commentRepository;
    private readonly userService;
    private readonly boardContentsService;
    constructor(commentRepository: Repository<CommentEntity>, userService: UsersService, boardContentsService: BoardContentsService);
    create(userInfo: UsersEntity, createCommentDto: CreateCommentDto): Promise<{
        comment: CommentEntity;
    }>;
    findAll(category: string, foreignIdx: number, options: PaginationOptions): Promise<{
        data: Pagination<CommentEntity>;
    }>;
    findOne(id: number): string;
    findOneIdx(idx: number): Promise<CommentEntity>;
    update(idx: number, userInfo: UsersEntity, updateCommentDto: UpdateCommentDto): Promise<{
        comment: CommentEntity;
    }>;
    remove(id: number): string;
}
