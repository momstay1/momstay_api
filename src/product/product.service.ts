import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.product_option', 'product_option')
      .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
      .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
      .where((qb) => {
        qb.where('`product_option`.status = :status', { status: 2 });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        if (get(where, 'keyword', '')) {
          qb.orWhere('`product`.`title` LIKE :title', { title: '%' + get(where, 'keyword') + '%' });
          qb.orWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + get(where, 'keyword') + '%' });
          qb.orWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + get(where, 'keyword') + '%' });
          qb.orWhere('`product`.`metro` LIKE :metro', { metro: '%' + get(where, 'keyword') + '%' });
          qb.orWhere('`product`.`college` LIKE :college', { college: '%' + get(where, 'keyword') + '%' });
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    return new Pagination({
      results,
      total,
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
