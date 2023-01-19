import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
export declare class ProductInfoService {
    create(createProductInfoDto: CreateProductInfoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductInfoDto: UpdateProductInfoDto): string;
    remove(id: number): string;
}
