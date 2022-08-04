/// <reference types="multer" />
import { UsersEntity } from 'src/users/entities/user.entity';
import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
export declare class DefectController {
    private readonly defectService;
    constructor(defectService: DefectService);
    sanitizeDefect(data: any): any[];
    create(user: UsersEntity, createDefectDto: CreateDefectDto, files: Array<Express.Multer.File>): Promise<{
        dft: import("./entities/defect.entity").DefectEntity[];
        file_info: {};
    }>;
    findAll(place: number, take: number, page: number, order: string, sort: string, search: string[]): Promise<{
        results: any[][];
        total: number;
        pageTotal: number;
    }>;
    sampleExcel(place_idx: any, res: any): Promise<void>;
    findOne(dft_idx: string): Promise<import("./entities/defect.entity").DefectEntity>;
    update(id: string, updateDefectDto: UpdateDefectDto): string;
    remove(id: string): string;
    statusUpdate(idxs: []): Promise<void>;
}
