import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
export declare class DefectService {
    create(createDefectDto: CreateDefectDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDefectDto: UpdateDefectDto): string;
    remove(id: number): string;
}
