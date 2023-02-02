import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ProductOptionEntity } from './entities/product-option.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/file/file.service';
import { ProductInfoService } from 'src/product-info/product-info.service';
export declare class ProductOptionService {
    private productOptionRepository;
    private readonly productService;
    private readonly fileService;
    private readonly productInfoService;
    constructor(productOptionRepository: Repository<ProductOptionEntity>, productService: ProductService, fileService: FileService, productInfoService: ProductInfoService);
    create(createProductOptionDto: CreateProductOptionDto, files: any): Promise<{
        productOption: ProductOptionEntity;
        file_info: any;
    }>;
    findAll(options: PaginationOptions, search: string[]): Promise<{
        data: Pagination<ProductOptionEntity>;
        file_info: {};
    }>;
    findOne(idx: number): Promise<{
        productOption: ProductOptionEntity;
        file_info: {};
    }>;
    findIdx(idx: number): Promise<ProductOptionEntity>;
    update(id: number, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(id: number): string;
}
