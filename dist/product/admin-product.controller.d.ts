import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class AdminProductController {
    private readonly productService;
    constructor(productService: ProductService);
    adminFindAll(take: number, page: number, search: string[], order: string): Promise<{
        file_info: {};
        results: import("./entities/product.entity").ProductEntity[];
        pageTotal: number;
        total: number;
        page: number;
    }>;
    excelDownload(take: number, page: number, search: string[], order: string, res: any): Promise<void>;
    findOne(idx: string): Promise<{
        product: import("./entities/product.entity").ProductEntity;
        file_info: {};
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(idx: string): Promise<void>;
}
