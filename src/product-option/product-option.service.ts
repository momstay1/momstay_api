import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from 'src/paginate';
import { commonUtils } from 'src/common/common.utils';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';
import { In, Repository } from 'typeorm';
import { get, isEmpty, map, merge, union } from 'lodash';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/file/file.service';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOptionEntity) private productOptionRepository: Repository<ProductOptionEntity>,
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) { }

  async create(createProductOptionDto: CreateProductOptionDto, files) {

    // 숙소 정보 가져오기
    let product;
    if (get(createProductOptionDto, 'productIdx', '')) {
      const productIdx = get(createProductOptionDto, 'productIdx');
      product = await this.productService.findIdx(+productIdx);
    }

    // 방 정보
    const product_option_data = {
      idx: +get(createProductOptionDto, 'idx'),
      status: +get(createProductOptionDto, 'status', 0),
      type: get(createProductOptionDto, 'type', ''),
      order: '10',
      stayStatus: get(createProductOptionDto, 'stayStatus', '0'),
      visitStatus: get(createProductOptionDto, 'visitStatus', '0'),
      paymentStatus: get(createProductOptionDto, 'paymentStatus', '0'),
      title: get(createProductOptionDto, 'title', ''),
      price: +get(createProductOptionDto, 'price', 0),
      priceMonth: +get(createProductOptionDto, 'priceMonth', 0),
      priceWeek: +get(createProductOptionDto, 'priceWeek', 0),
      priceDay: +get(createProductOptionDto, 'priceDay', 0),
      detailsKor: get(createProductOptionDto, 'detailsKor', ''),
      detailsEng: get(createProductOptionDto, 'detailsEng', ''),
      detailsJpn: get(createProductOptionDto, 'detailsJpn', ''),
      detailsChn: get(createProductOptionDto, 'detailsChn', ''),
      privateFacility: get(createProductOptionDto, 'privateFacility', ''),
      productInfo: product,
    };
    // 방 등록
    const productOptionEntity = await this.productOptionRepository.create(product_option_data);
    const productOption = await this.productOptionRepository.save(productOptionEntity);
    productOption['product'] = product;

    // 파일 제거
    if (get(createProductOptionDto, 'filesIdx', '')) {
      const productOptionFileIdxs = map(
        await this.fileService.findCategory(["roomDetailImg"], "" + productOption['idx']),
        (o) => "" + o.file_idx
      );
      const fileIdxs = get(createProductOptionDto, 'filesIdx').split(",");
      const delFileIdxs = productOptionFileIdxs.filter(o => !fileIdxs.includes(o));
      if (delFileIdxs.length > 0) {
        await this.fileService.removes(delFileIdxs);
      }
    }

    // 새 첨부파일 등록
    let new_file;
    let fileIdxs;
    if (!isEmpty(files)) {
      new_file = await this.fileService.fileInfoInsert(files, productOption['idx']);
      fileIdxs = map(new_file, (o) => o.idx);
    }

    fileIdxs = union(fileIdxs, get(createProductOptionDto, 'filesIdx').split(","));
    const file_info = await this.fileService.findIndexs(fileIdxs);

    return { productOption, file_info }
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

  async findIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const productOption = await this.productOptionRepository.findOne({
      where: { idx: idx },
    });
    if (!productOption.idx) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return productOption;
  }

  update(id: number, updateProductOptionDto: UpdateProductOptionDto) {
    return `This action updates a #${id} productOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} productOption`;
  }
}
