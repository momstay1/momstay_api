import { CreatePgCancelDto } from './dto/create-pg-cancel.dto';
import { UpdatePgCancelDto } from './dto/update-pg-cancel.dto';
export declare class PgCancelService {
    create(createPgCancelDto: CreatePgCancelDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePgCancelDto: UpdatePgCancelDto): string;
    remove(id: number): string;
}
