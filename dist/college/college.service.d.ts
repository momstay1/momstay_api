import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { CollegeEntity } from './entities/college.entity';
export declare class CollegeService {
    private collegeRepository;
    constructor(collegeRepository: Repository<CollegeEntity>);
    create(createCollegeDto: CreateCollegeDto): string;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<CollegeEntity>>;
    findOne(id: number): string;
    update(id: number, updateCollegeDto: UpdateCollegeDto): string;
    remove(id: number): string;
}
