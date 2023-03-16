import { BannerEntity } from "src/banner/entities/banner.entity";
export declare class BannerItemEntity {
    idx: number;
    status: number;
    order: number;
    content: string;
    start: string;
    end: string;
    banner: BannerEntity;
    createdAt: Date;
    updatedAt: Date;
}
