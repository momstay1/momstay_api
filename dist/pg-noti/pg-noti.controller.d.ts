import { PgNotiService } from './pg-noti.service';
import { CreatePgNotiDto } from './dto/create-pg-noti.dto';
import { UpdatePgNotiDto } from './dto/update-pg-noti.dto';
export declare class PgNotiController {
    private readonly pgNotiService;
    constructor(pgNotiService: PgNotiService);
    create(createPgNotiDto: CreatePgNotiDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePgNotiDto: UpdatePgNotiDto): string;
    remove(id: string): string;
}
