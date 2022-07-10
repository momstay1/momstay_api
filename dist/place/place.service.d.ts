import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';
export declare class PlaceService {
    private placeRepository;
    constructor(placeRepository: Repository<PlaceEntity>);
    getPrivateColumn(): string[];
    create(createPlaceDto: CreatePlaceDto): Promise<any>;
    findAll(options: PaginationOptions): Promise<Pagination<PlaceEntity>>;
    findOne(idx: number): Promise<PlaceEntity>;
    update(idx: number, updatePlaceDto: UpdatePlaceDto): Promise<PlaceEntity>;
    remove(idx: number): Promise<void>;
    removes(idxs: []): Promise<void>;
    statusUpdate(idxs: [], status: string): Promise<void>;
    private checkPlaceExists;
    private savePlace;
}
