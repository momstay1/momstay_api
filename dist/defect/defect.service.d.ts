import { AlignmentOptions } from 'src/alignment';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
import { DefectEntity } from './entities/defect.entity';
import { PlaceService } from 'src/place/place.service';
export declare class DefectService {
    private defectRepository;
    private readonly usersService;
    private readonly fileService;
    private readonly placeService;
    constructor(defectRepository: Repository<DefectEntity>, usersService: UsersService, fileService: FileService, placeService: PlaceService);
    getPrivateColumn(): string[];
    create(user: any, createDefectDto: CreateDefectDto, files: any): Promise<{
        dft: DefectEntity[];
        file_info: {};
    }>;
    findAll(place: number, options: PaginationOptions, alignment: AlignmentOptions, search: string[]): Promise<Pagination<DefectEntity>>;
    findAllPlaceCount(place_idx: Array<Number>): Promise<any[]>;
    findAllPlaceIdxs(place_idx: Array<Number>): Promise<any[]>;
    findAllPlace(place_idx: any): Promise<any[]>;
    excel(place_idx: any): Promise<{
        file_name: string;
        file_path: string;
    }>;
    findOne(dft_idx: number): Promise<DefectEntity>;
    update(id: number, updateDefectDto: UpdateDefectDto): string;
    remove(id: number): string;
    removes(idxs: []): Promise<void>;
}
