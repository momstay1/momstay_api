import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    create(createProductDto: CreateProductDto): Promise<string>;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<ProductEntity>>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
