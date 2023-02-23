import { ProductOptionEntity } from "src/product-option/entities/product-option.entity";
import { ProductEntity } from "src/product/entities/product.entity";
export declare class ProductInfoEntity {
    idx: number;
    status: number;
    group: string;
    type: string;
    typeEng: string;
    typeJpn: string;
    typeChn: string;
    name: string;
    nameEng: string;
    nameJpn: string;
    nameChn: string;
    product: ProductEntity[];
    productOption: ProductOptionEntity[];
}
