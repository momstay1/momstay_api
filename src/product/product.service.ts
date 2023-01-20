import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty, isObject, keyBy, map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private readonly fileService: FileService,
  ) { }

  async create(createProductDto: CreateProductDto, files) {
    // 숙소 정보
    const product_data = {
      idx: +get(createProductDto, 'idx'),
      status: +get(createProductDto, 'status', 0),
      type: get(createProductDto, 'type', ''),
      order: '10',
      membership: get(createProductDto, 'membership', '0'),
      hostBusiness: get(createProductDto, 'hostBusiness', ''),
      title: get(createProductDto, 'title', ''),
      postCode: get(createProductDto, 'postCode', ''),
      addr1: get(createProductDto, 'addr1', ''),
      addr2: get(createProductDto, 'addr2', ''),
      language: get(createProductDto, 'language', ''),
      metro: get(createProductDto, 'metro', ''),
      lat: get(createProductDto, 'lat', ''),
      lng: get(createProductDto, 'lng', ''),
      college: get(createProductDto, 'college', ''),
      detailsKor: get(createProductDto, 'detailsKor', ''),
      detailsEng: get(createProductDto, 'detailsEng', ''),
      detailsJpn: get(createProductDto, 'detailsJpn', ''),
      userIdx: get(createProductDto, 'userIdx'),
    };
    // 숙소 등록
    const productEntity = await this.productRepository.create(product_data);
    const product = await this.productRepository.save(productEntity);

    // 파일 제거
    if (get(createProductDto, 'filesIdx', '')) {
      const productFileIdxs = map(
        await this.fileService.findCategory(["lodgingDetailImg", "mealsImg"], "" + product_data.idx),
        (o) => "" + o.file_idx
      );
      const fileIdxs = get(createProductDto, 'filesIdx').split(",");
      const delFileIdxs = productFileIdxs.filter(o => !fileIdxs.includes(o));
      await this.fileService.removes(delFileIdxs);
    }

    // 새 첨부파일 등록
    let file_info;
    if (!isEmpty(files)) {
      file_info = await this.fileService.fileInfoInsert(files, product['idx']);
    }

    return { product, file_info }
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
