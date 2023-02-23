import { CreatePgNotiDto } from './dto/create-pg-noti.dto';
import { UpdatePgNotiDto } from './dto/update-pg-noti.dto';
export declare class PgNotiService {
    create(createPgNotiDto: CreatePgNotiDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePgNotiDto: UpdatePgNotiDto): string;
    remove(id: number): string;
}
