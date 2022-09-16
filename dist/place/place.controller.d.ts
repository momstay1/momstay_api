import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
export declare class PlaceController {
    private readonly placeService;
    constructor(placeService: PlaceService);
    sanitizePlace(data: any): any[];
    create(createPlaceDto: CreatePlaceDto): Promise<any[]>;
    findAll(take: number, page: number): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findAllDefect(take: number, page: number): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findOne(idx: string): Promise<{
        place: any[];
        dfp: {};
    }>;
    statusUpdate(idxs: [], status: string): Promise<void>;
    update(idx: string, updatePlaceDto: UpdatePlaceDto): Promise<any[]>;
    remove(idxs: []): Promise<void>;
}
