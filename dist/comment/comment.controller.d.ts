import { UsersEntity } from 'src/users/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(user: UsersEntity, createCommentDto: CreateCommentDto): Promise<{
        comment: import("./entities/comment.entity").CommentEntity;
    }>;
    findAll(category: string, foreignIdx: string, take: number, page: number): Promise<{
        results: import("./entities/comment.entity").CommentEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(id: string): string;
    update(idx: string, user: UsersEntity, updateCommentDto: UpdateCommentDto): Promise<{
        comment: import("./entities/comment.entity").CommentEntity;
    }>;
    remove(id: string): string;
}
