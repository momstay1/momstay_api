import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
import { MetroEntity } from './entities/metro.entity';
export declare class MetroService {
    private metroRepository;
    constructor(metroRepository: Repository<MetroEntity>);
    create(createMetroDto: CreateMetroDto): string;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<MetroEntity>>;
    findAllIdx(idxs: number[]): Promise<MetroEntity[]>;
    findOne(id: number): string;
    update(id: number, updateMetroDto: UpdateMetroDto): string;
    remove(id: number): string;
}
