import { ProductOptionService } from './product-option.service';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
export declare class ProductOptionController {
    private readonly productOptionService;
    constructor(productOptionService: ProductOptionService);
    create(createProductOptionDto: CreateProductOptionDto): string;
    findAll(take: number, page: number, search: string[]): Promise<{
        results: import("./entities/product-option.entity").ProductOptionEntity[];
        total: number;
        pageTotal: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(id: string): string;
}
