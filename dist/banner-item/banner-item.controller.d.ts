/// <reference types="multer" />
import { BannerItemService } from './banner-item.service';
import { CreateBannerItemDto } from './dto/create-banner-item.dto';
import { UpdateBannerItemDto } from './dto/update-banner-item.dto';
export declare class BannerItemController {
    private readonly bannerItemService;
    constructor(bannerItemService: BannerItemService);
    create(createBannerItemDto: CreateBannerItemDto, files: Array<Express.Multer.File>): Promise<{
        banner: import("../banner/entities/banner.entity").BannerEntity;
        file_info: {};
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBannerItemDto: UpdateBannerItemDto): string;
    remove(id: string): string;
}
