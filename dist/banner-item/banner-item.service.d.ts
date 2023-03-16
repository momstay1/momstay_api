import { BannerService } from 'src/banner/banner.service';
import { FileService } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';
import { BannerItemEntity } from './entities/banner-item.entity';
export declare class BannerItemService {
    private bniRepository;
    private readonly bannerService;
    private readonly fileService;
    constructor(bniRepository: Repository<BannerItemEntity>, bannerService: BannerService, fileService: FileService);
    create(createBannerItemDto: CreateBannerItemDto, files: any): Promise<{
        banner: import("../banner/entities/banner.entity").BannerEntity;
        file_info: {};
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBannerItemDto: UpdateBannerItemDto): string;
    remove(id: number): string;
    removeIdxs(idxs: number[]): Promise<void>;
}
