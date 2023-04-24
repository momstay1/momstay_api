import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ProductOptionEntity } from './entities/product-option.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/file/file.service';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { ExcelService } from 'src/excel/excel.service';
import { UsersService } from 'src/users/users.service';
export declare class ProductOptionService {
    private productOptionRepository;
    private readonly productService;
    private readonly fileService;
    private readonly userService;
    private readonly productInfoService;
    private readonly excelService;
    constructor(productOptionRepository: Repository<ProductOptionEntity>, productService: ProductService, fileService: FileService, userService: UsersService, productInfoService: ProductInfoService, excelService: ExcelService);
    create(createProductOptionDto: CreateProductOptionDto, files: any): Promise<{
        productOption: ProductOptionEntity;
        file_info: any;
    }>;
    productOptionCreateCode(): Promise<string>;
    findAll(options: PaginationOptions, search: string[], order: string): Promise<{
        data: Pagination<ProductOptionEntity>;
        file_info: {};
    }>;
    findOne(idx: number): Promise<{
        productOption: ProductOptionEntity;
        file_info: {};
    }>;
    findIdx(idx: number): Promise<ProductOptionEntity>;
    update(id: number, updateProductOptionDto: UpdateProductOptionDto): string;
    hostRemove(userInfo: any, idx: number): Promise<void>;
    remove(idx: number): Promise<void>;
    createExcel(options: PaginationOptions, search: string[], order: string): Promise<{
        file_name: string;
        file_path: string;
    }>;
}
