/// <reference types="multer" />
import { PopupService } from './popup.service';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { PopupEntity } from './entities/popup.entity';
export declare class AdminPopupController {
    private readonly popupService;
    constructor(popupService: PopupService);
    create(createPopupDto: CreatePopupDto, files: Array<Express.Multer.File>): Promise<{
        popup: PopupEntity;
        file_info: any;
    }>;
    findAll(page: number, take: number): Promise<{
        results: PopupEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    findOne(idx: number): Promise<{
        popup: PopupEntity;
        file_info: {};
    }>;
    update(idx: number, updatePopupDto: UpdatePopupDto, files: Array<Express.Multer.File>): Promise<{
        popup: {
            filesIdx: string;
            status: number;
            id: string;
            title: string;
            page: string;
            startPeriod: string | Date;
            endPeriod: string | Date;
            order: number;
            link: string;
            popupImg?: string[];
            idx: number;
            createdAt: Date;
            updatedAt: Date;
        } & PopupEntity;
        file_info: any;
    }>;
    delete(idxs: []): Promise<void>;
}
