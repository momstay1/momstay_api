import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { ProductEntity } from "src/product/entities/product.entity";
export declare class ProductInfoEntity {
    idx: number;
    status: number;
    group: string;
    type: string;
    name: string;
    product: ProductEntity[];
    productOption: ProductOptionEntity[];
}
