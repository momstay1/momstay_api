import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BannerEntity } from './entities/banner.entity';
import { FileService } from 'src/file/file.service';
import { BannerItemService } from 'src/banner-item/banner-item.service';
export declare class BannerService {
    private bannerRepository;
    private readonly bniService;
    private readonly fileService;
    constructor(bannerRepository: Repository<BannerEntity>, bniService: BannerItemService, fileService: FileService);
    create(createBannerDto: CreateBannerDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        banner: BannerEntity;
        file_info: {};
    }>;
    findOneId(id: string): Promise<BannerEntity>;
    update(id: number, updateBannerDto: UpdateBannerDto): string;
    remove(id: number): string;
}
