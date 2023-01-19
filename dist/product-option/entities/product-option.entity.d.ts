import { ProductEntity } from "src/product/entities/product.entity";
export declare class ProductOptionEntity {
    idx: number;
    status: number;
    type: string;
    order: string;
    stayStatus: string;
    visitStatus: string;
    paymentStatus: string;
    title: string;
    price: number;
    priceMonth: number;
    priceWeek: number;
    priceDay: number;
    detailsKor: string;
    detailsEng: string;
    detailsJpn: string;
    detailsChn: string;
    oldIdx: string;
    oldData: string;
    privateFacility: string;
    createdAt: Date;
    updatedAt: Date;
    product: ProductEntity;
}
