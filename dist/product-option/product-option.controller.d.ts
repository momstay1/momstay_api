/// <reference types="multer" />
import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
export declare class ProductOptionController {
    private readonly productOptionService;
    constructor(productOptionService: ProductOptionService);
    create(createProductOptionDto: CreateProductOptionDto, files: Array<Express.Multer.File>): Promise<{
        productOption: import("./entities/product-option.entity").ProductOptionEntity;
        file_info: any;
    }>;
    findAll(take: number, page: number, search: string[]): Promise<{
        results: import("./entities/product-option.entity").ProductOptionEntity[];
        total: number;
        pageTotal: number;
    }>;
    findOne(idx: string): Promise<import("./entities/product-option.entity").ProductOptionEntity>;
    update(id: string, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(id: string): string;
}
