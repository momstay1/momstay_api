import { Repository } from 'typeorm';
import { UpdatePgDatumDto } from './dto/update-pg-data.dto';
import { PgDataEntity } from './entities/pg-data.entity';
export declare class PgDataService {
    private pgDataRepository;
    constructor(pgDataRepository: Repository<PgDataEntity>);
    create(ord_code: string, createPgData: any): Promise<PgDataEntity[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePgDatumDto: UpdatePgDatumDto): string;
    remove(id: number): string;
}
