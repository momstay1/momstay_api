import { DefectPlaceService } from './defect-place.service';
import { CreateDefectPlaceDto } from './dto/create-defect-place.dto';
import { UpdateDefectPlaceDto } from './dto/update-defect-place.dto';
export declare class DefectPlaceController {
    private readonly defectPlaceService;
    constructor(defectPlaceService: DefectPlaceService);
    sanitizeDefectPlace(data: any): any[];
    create(createDefectPlaceDto: CreateDefectPlaceDto): Promise<any[]>;
    uploadExcel(idx: string, excel: any): Promise<void>;
    findAll(place: number, take: number, page: number): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    sampleExcel(res: any): Promise<void>;
    findOne(idx: string): Promise<any[]>;
    update(idx: string, updateDefectPlaceDto: UpdateDefectPlaceDto): Promise<any[]>;
    remove(idxs: []): Promise<void>;
}
