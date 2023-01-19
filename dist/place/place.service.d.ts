import { DefectService } from 'src/defect/defect.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';
export declare class PlaceService {
    private placeRepository;
    private readonly defectService;
    constructor(placeRepository: Repository<PlaceEntity>, defectService: DefectService);
    getPrivateColumn(): string[];
    create(createPlaceDto: CreatePlaceDto): Promise<any>;
    findAll(options: PaginationOptions): Promise<Pagination<PlaceEntity>>;
    findAllDefect(options: PaginationOptions): Promise<Pagination<PlaceEntity>>;
    findOne(idx: number): Promise<PlaceEntity>;
    getDefectPlace(defect_place: any): Promise<{}>;
    update(idx: number, updatePlaceDto: UpdatePlaceDto): Promise<PlaceEntity>;
    remove(idx: number): Promise<void>;
    removes(idxs: []): Promise<void>;
    statusUpdate(idxs: [], status: string): Promise<void>;
    private checkPlaceExists;
    private savePlace;
    private getStatus;
}