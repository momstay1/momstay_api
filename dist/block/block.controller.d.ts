import { UsersEntity } from 'src/users/entities/user.entity';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
export declare class BlockController {
    private readonly blockService;
    constructor(blockService: BlockService);
    create(user: UsersEntity, createBlockDto: CreateBlockDto): Promise<{
        block: import("./entities/block.entity").BlockEntity;
    }>;
    findAll(): void;
    findOne(id: string): string;
    update(id: string, updateBlockDto: UpdateBlockDto): string;
    remove(id: string): string;
}
