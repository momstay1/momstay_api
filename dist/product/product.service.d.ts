import { CollegeService } from 'src/college/college.service';
import { FileService } from 'src/file/file.service';
import { MetroService } from 'src/metro/metro.service';
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
    private readonly metroService;
    private readonly collegeService;
    constructor(productRepository: Repository<ProductEntity>, fileService: FileService, productInfoService: ProductInfoService, userService: UsersService, metroService: MetroService, collegeService: CollegeService);
    test(id: any): Promise<string>;
    create(createProductDto: CreateProductDto, files: any): Promise<{
        product: ProductEntity;
        file_info: any;
    }>;
    productCreateCode(): Promise<string>;
    findAll(options: PaginationOptions, search: string[]): Promise<{
        data: Pagination<ProductEntity>;
        file_info: {};
    }>;
    adminFindAll(options: PaginationOptions, search: string[]): Promise<{
        data: Pagination<ProductEntity>;
        file_info: {};
    }>;
    findIdxAll(idx: number[]): Promise<ProductEntity[]>;
    findOne(idx: number): Promise<{
        product: ProductEntity;
        file_info: {};
    }>;
    adminFindOne(idx: number): Promise<{
        product: ProductEntity;
        file_info: {};
    }>;
    getFileInfo(idxs: number[]): Promise<{}>;
    findIdxOne(idx: number): Promise<ProductEntity>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
