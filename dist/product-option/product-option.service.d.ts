import { Pagination, PaginationOptions } from 'src/paginate';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { ProductOptionEntity } from './entities/product-option.entity';
import { Repository } from 'typeorm';
export declare class ProductOptionService {
    private productOptionRepository;
    constructor(productOptionRepository: Repository<ProductOptionEntity>);
    create(createProductOptionDto: CreateProductOptionDto): string;
    findAll(options: PaginationOptions, search: string[]): Promise<Pagination<ProductOptionEntity>>;
    findOne(id: number): string;
    update(id: number, updateProductOptionDto: UpdateProductOptionDto): string;
    remove(id: number): string;
}
