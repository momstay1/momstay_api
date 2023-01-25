import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ProductOptionEntity } from './entities/product-option.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/file/file.service';
export declare class ProductOptionService {
    private productOptionRepository;
    private readonly productService;
    private readonly fileService;
    constructor(productOptionRepository: Repository<ProductOptionEntity>, productService: ProductService, fileService: FileService);
    create(createProductOptionDto: CreateProductOptionDto, files: any): Promise<{
        productOption: ProductOptionEntity;
        file_info: import("../file/entities/file.entity").FileEntity[];
    }>;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<ProductOptionEntity>>;
    findOne(id: number): string;
    findIdx(idx: number): Promise<ProductOptionEntity>;
    update(id: number, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(id: number): string;
}
