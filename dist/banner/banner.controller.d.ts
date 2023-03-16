import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannerController {
    private readonly bannerService;
    constructor(bannerService: BannerService);
    create(createBannerDto: CreateBannerDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        banner: import("./entities/banner.entity").BannerEntity;
        file_info: {};
    }>;
    update(id: string, updateBannerDto: UpdateBannerDto): string;
    remove(id: string): string;
}
