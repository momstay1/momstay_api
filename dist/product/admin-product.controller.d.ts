import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class AdminProductController {
    private readonly productService;
    constructor(productService: ProductService);
    adminFindAll(take: number, page: number, search: string[]): Promise<{
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
