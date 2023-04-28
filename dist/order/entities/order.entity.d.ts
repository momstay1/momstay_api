import { UsersEntity } from "src/users/entities/user.entity";
import { OrderProductEntity } from "src/order-product/entities/order-product.entity";
export declare class OrderEntity {
    idx: number;
    status: number;
    code: string;
    imp_uid: string;
    billingKey: string;
    payment: string;
    clientName: string;
    clientEmail: string;
    clientPhone1: string;
    clientPhone2: string;
    inPostCode: string;
    inAddr1: string;
    inAddr2: string;
    shipName: string;
    shipPhone1: string;
    shipPhone2: string;
    shipArea: string;
    shipPostCode: string;
    shipNation: string;
    shipState: string;
    shipCity: string;
    shipAddr1: string;
    shipAddr2: string;
    bank: string;
    account: string;
    depositer: string;
    remitter: string;
    clientMemo: string;
    adminMemo: string;
    pc_mobile: string;
    userAgent: string;
    paiedAt: Date | string;
    createdAt: Date;
    updatedAt: Date;
    orderProduct: OrderProductEntity[];
    user: UsersEntity;
}