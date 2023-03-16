import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { BlockEntity } from './entities/block.entity';
export declare class BlockService {
    private blockRepository;
    private readonly usersService;
    constructor(blockRepository: Repository<BlockEntity>, usersService: UsersService);
    create(userInfo: UsersEntity, createBlockDto: CreateBlockDto): Promise<{
        block: BlockEntity;
    }>;
    findAllUser(userIdx: number): Promise<BlockEntity[]>;
    findOne(id: number): string;
    update(id: number, updateBlockDto: UpdateBlockDto): string;
    remove(id: number): string;
}
