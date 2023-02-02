import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    private readonly fileService;
    private readonly productInfoService;
    private readonly userService;
    constructor(productRepository: Repository<ProductEntity>, fileService: FileService, productInfoService: ProductInfoService, userService: UsersService);
    create(createProductDto: CreateProductDto, files: any): Promise<{
        product: ProductEntity;
        file_info: any;
    }>;
    findAll(options: PaginationOptions, search: string[]): Promise<{
        data: Pagination<ProductEntity>;
        file_info: {};
    }>;
    findIdxAll(idx: number[]): Promise<ProductEntity[]>;
    findOne(idx: number): Promise<{
        product: ProductEntity;
        file_info: {};
    }>;
    findIdxOne(idx: number): Promise<ProductEntity>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
