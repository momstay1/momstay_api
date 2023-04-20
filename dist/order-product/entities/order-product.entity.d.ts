import { UsersEntity } from "src/users/entities/user.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
export declare class OrderProductEntity {
    idx: number;
    status: number;
    code: string;
    eq: string;
    productOptionCode: string;
    productType: string;
    parcelCode: string;
    title: string;
    options: string;
    img: string;
    num: number;
    price: number;
    taxPrice: number;
    feePrice: number;
    point: number;
    payPrice: number;
    cancelPrice: number;
    cancelPoint: number;
    memo: string;
    cancelReason: string;
    startAt: string;
    endAt: string;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity;
    order: OrderEntity;
    productOption: ProductOptionEntity;
}