import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
export declare class DefectController {
    private readonly defectService;
    constructor(defectService: DefectService);
    create(createDefectDto: CreateDefectDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDefectDto: UpdateDefectDto): string;
    remove(id: string): string;
}
