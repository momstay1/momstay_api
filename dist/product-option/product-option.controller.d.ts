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
    findAll(take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("./entities/product-option.entity").ProductOptionEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    excelDownload(take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    test(): Promise<void>;
    findOne(idx: string): Promise<{
        productOption: import("./entities/product-option.entity").ProductOptionEntity;
        file_info: {};
    }>;
    update(id: string, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(user: any, idx: string): Promise<void>;
}
