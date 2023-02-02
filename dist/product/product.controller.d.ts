/// <reference types="multer" />
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, files: Array<Express.Multer.File>): Promise<{
        product: import("./entities/product.entity").ProductEntity;
        file_info: any;
    }>;
    findAll(take: number, page: number, search: string[]): Promise<{
        results: import("./entities/product.entity").ProductEntity[];
        total: number;
        pageTotal: number;
        file_info: {};
    }>;
    findOne(idx: string): Promise<{
        product: import("./entities/product.entity").ProductEntity;
        file_info: {};
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
