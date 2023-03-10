import { ProductEntity } from "src/product/entities/product.entity";
import { UsersEntity } from "src/users/entities/user.entity";
export declare class ReviewEntity {
    idx: number;
    status: number;
    group: number;
    depth: number;
    star: number;
    orderProductIdx: string;
    contents: string;
    author: string;
    start: string;
    end: string;
    createdAt: Date;
    updatedAt: Date;
    product: ProductEntity;
    user: UsersEntity;
}
