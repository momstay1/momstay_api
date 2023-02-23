import { PgDataService } from './pg-data.service';
import { CreatePgDatumDto } from './dto/create-pg-datum.dto';
import { UpdatePgDatumDto } from './dto/update-pg-datum.dto';
export declare class PgDataController {
    private readonly pgDataService;
    constructor(pgDataService: PgDataService);
    create(createPgDatumDto: CreatePgDatumDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePgDatumDto: UpdatePgDatumDto): string;
    remove(id: string): string;
}
