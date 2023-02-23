import { PgCancelService } from './pg-cancel.service';
import { CreatePgCancelDto } from './dto/create-pg-cancel.dto';
import { UpdatePgCancelDto } from './dto/update-pg-cancel.dto';
export declare class PgCancelController {
    private readonly pgCancelService;
    constructor(pgCancelService: PgCancelService);
    create(createPgCancelDto: CreatePgCancelDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePgCancelDto: UpdatePgCancelDto): string;
    remove(id: string): string;
}
