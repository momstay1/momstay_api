import { CreatePgDatumDto } from './dto/create-pg-datum.dto';
import { UpdatePgDatumDto } from './dto/update-pg-datum.dto';
export declare class PgDataService {
    create(createPgDatumDto: CreatePgDatumDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePgDatumDto: UpdatePgDatumDto): string;
    remove(id: number): string;
}
