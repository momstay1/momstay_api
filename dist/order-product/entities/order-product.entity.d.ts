import { UsersEntity } from "src/users/entities/user.entity";
import { OrderEntity } from "src/order/entities/order.entity";
export declare class OrderProductEntity {
    idx: number;
    status: number;
    code: string;
    eq: string;
    productIdx: string;
    productCode: string;
    productType: string;
    parcelCode: string;
    title: string;
    options: string;
    img: string;
    num: number;
    price: number;
    point: number;
    payPrice: number;
    refundPrice: number;
    refundPoint: number;
    memo: string;
    startAt: string;
    endAt: string;
    createdAt: Date;
    updatedAt: Date;
    user: UsersEntity;
    order: OrderEntity;
}
