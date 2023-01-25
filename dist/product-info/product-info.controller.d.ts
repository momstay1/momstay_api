import { ProductInfoService } from './product-info.service';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
export declare class ProductInfoController {
    private readonly productInfoService;
    constructor(productInfoService: ProductInfoService);
    create(createProductInfoDto: CreateProductInfoDto): string;
    findAll(): Promise<import("./entities/product-info.entity").ProductInfoEntity[]>;
    findOne(id: string): string;
    update(id: string, updateProductInfoDto: UpdateProductInfoDto): string;
    remove(id: string): string;
}
