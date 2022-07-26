import { AlignmentOptions } from 'src/alignment';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
import { DefectEntity } from './entities/defect.entity';
export declare class DefectService {
    private defectRepository;
    private readonly usersService;
    constructor(defectRepository: Repository<DefectEntity>, usersService: UsersService);
    getPrivateColumn(): string[];
    create(createDefectDto: CreateDefectDto): string;
    findAll(place: number, options: PaginationOptions, alignment: AlignmentOptions, search: string[]): Promise<Pagination<DefectEntity>>;
    findAllPlace(place_idx: Array<Number>): Promise<any[]>;
    findOne(id: number): string;
    update(id: number, updateDefectDto: UpdateDefectDto): string;
    remove(id: number): string;
}
