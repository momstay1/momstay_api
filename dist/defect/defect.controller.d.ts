import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
export declare class DefectController {
    private readonly defectService;
    constructor(defectService: DefectService);
    sanitizeDefect(data: any): any[];
    create(createDefectDto: CreateDefectDto): string;
    findAll(place: number, take: number, page: number, order: string, sort: string, search: string[]): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateDefectDto: UpdateDefectDto): string;
    remove(id: string): string;
}
