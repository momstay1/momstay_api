import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from 'src/paginate';
import { commonUtils } from 'src/common/common.utils';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';
import { In, Repository } from 'typeorm';
import { get, map } from 'lodash';

@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOptionEntity) private productOptionRepository: Repository<ProductOptionEntity>,
  ) { }

  create(createProductOptionDto: CreateProductOptionDto) {
    return 'This action adds a new productOption';
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    const [results, total] = await this.productOptionRepository.createQueryBuilder('product_option')
      .leftJoinAndSelect('product_option.product', 'product')
      .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
      .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
      .where((qb) => {
        qb.where('`product_option`.status = :status', { status: 2 });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'title') });
        get(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + get(where, 'title') + '%' });
        get(where, 'addr1', '') && qb.andWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + get(where, 'addr1') + '%' });
        get(where, 'addr2', '') && qb.andWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + get(where, 'addr2') + '%' });
        get(where, 'metro', '') && qb.andWhere('`product`.`metro` LIKE :metro', { metro: '%' + get(where, 'metro') + '%' });
        get(where, 'college', '') && qb.andWhere('`product`.`college` LIKE :college', { college: '%' + get(where, 'college') + '%' });
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
    return `This action returns a #${id} productOption`;
  }

  update(id: number, updateProductOptionDto: UpdateProductOptionDto) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
