import { Repository } from 'typeorm';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ProductInfoEntity } from './entities/product-info.entity';
export declare class ProductInfoService {
    private productInfoRepository;
    constructor(productInfoRepository: Repository<ProductInfoEntity>);
    create(createProductInfoDto: CreateProductInfoDto): string;
    findAll(): Promise<ProductInfoEntity[]>;
    findAllIdxs(idxs: string[]): Promise<ProductInfoEntity[]>;
    findOne(id: number): string;
    update(id: number, updateProductInfoDto: UpdateProductInfoDto): string;
    remove(id: number): string;
}
