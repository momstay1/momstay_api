import { Pagination, PaginationOptions } from 'src/paginate';
import { PlaceService } from 'src/place/place.service';
import { Connection, Repository } from 'typeorm';
import { CreateDefectPlaceDto } from './dto/create-defect-place.dto';
import { UpdateDefectPlaceDto } from './dto/update-defect-place.dto';
import { DefectPlaceEntity } from './entities/defect-place.entity';
export declare class DefectPlaceService {
    private dfpRepository;
    private readonly placeService;
    private readonly connection;
    constructor(dfpRepository: Repository<DefectPlaceEntity>, placeService: PlaceService, connection: Connection);
    getPrivateColumn(): string[];
    create(createDefectPlaceDto: CreateDefectPlaceDto): Promise<DefectPlaceEntity[]>;
    findAll(place: number, options: PaginationOptions): Promise<Pagination<DefectPlaceEntity>>;
    findOne(idx: number): Promise<DefectPlaceEntity>;
    update(idx: number, updateDefectPlaceDto: UpdateDefectPlaceDto): Promise<any>;
    remove(id: number): string;
    removes(idxs: []): Promise<void>;
    uploadExcel(idx: any, excel: any): Promise<void>;
    sampleExcel(res: any): Promise<void>;
}
