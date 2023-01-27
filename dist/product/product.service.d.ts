import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    private readonly fileService;
    private readonly productInfoService;
    constructor(productRepository: Repository<ProductEntity>, fileService: FileService, productInfoService: ProductInfoService);
    create(createProductDto: CreateProductDto, files: any): Promise<{
        product: ProductEntity;
        file_info: import("../file/entities/file.entity").FileEntity[];
    }>;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<ProductEntity>>;
    findOne(idx: number): Promise<ProductEntity>;
    findIdx(idx: number): Promise<ProductEntity>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
