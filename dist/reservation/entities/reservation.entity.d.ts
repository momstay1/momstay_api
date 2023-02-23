import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { UsersEntity } from "src/users/entities/user.entity";
export declare class ReservationEntity {
    idx: number;
    status: number;
    visitDate: Date | string;
    visitTime: Date | string;
    occupancyAt: Date | string;
    evictionAt: Date | string;
    memo: string;
    createdAt: Date;
    updatedAt: Date;
    productOption: ProductOptionEntity;
    user: UsersEntity;
}
