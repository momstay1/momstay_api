import { BannerItemEntity } from "src/banner-item/entities/banner-item.entity";
export declare class BannerEntity {
    idx: number;
    status: number;
    order: number;
    id: string;
    title: string;
    itemInfo: string;
    bannerItem: BannerItemEntity[];
    createdAt: Date;
    updatedAt: Date;
}
