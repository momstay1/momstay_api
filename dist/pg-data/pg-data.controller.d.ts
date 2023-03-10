import { PgDataService } from './pg-data.service';
import { CreatePgDatumDto } from './dto/create-pg-data.dto';
import { UpdatePgDatumDto } from './dto/update-pg-data.dto';
export declare class PgDataController {
    private readonly pgDataService;
    constructor(pgDataService: PgDataService);
    create(createPgDatumDto: CreatePgDatumDto): void;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePgDatumDto: UpdatePgDatumDto): string;
    remove(id: string): string;
}
