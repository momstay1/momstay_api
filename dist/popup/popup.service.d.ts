import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreatePopupDto } from './dto/create-popup.dto';
import { UpdatePopupDto } from './dto/update-popup.dto';
import { PopupEntity } from './entities/popup.entity';
export declare class PopupService {
    private popupRepository;
    private fileService;
    constructor(popupRepository: Repository<PopupEntity>, fileService: FileService);
    create(createPopupDto: CreatePopupDto, files: any): Promise<{
        popup: PopupEntity;
        file_info: any;
    }>;
    findAll(options: PaginationOptions): Promise<{
        data: Pagination<PopupEntity>;
    }>;
    findOne(idx: number): Promise<{
        popup: PopupEntity;
        file_info: {};
    }>;
    getPopup(id: string, page: string): Promise<{
        popup: PopupEntity[];
        file_info: {};
    }>;
    findOneIdx(idx: number): Promise<PopupEntity>;
    findByIdOrPage(id: string, page: string): Promise<PopupEntity[]>;
    update(idx: number, updatePopupDto: UpdatePopupDto, files: any): Promise<{
        popup: {
            filesIdx: string;
            status: number;
            title: string;
            page: string;
            startPeriod: string | Date;
            endPeriod: string | Date;
            order: number;
            link: string;
            popupImg?: string[];
            idx: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        } & PopupEntity;
        file_info: any;
    }>;
    delete(idxs: []): Promise<void>;
    popupCreateCode(): any;
    private checkPopupIdExists;
}
