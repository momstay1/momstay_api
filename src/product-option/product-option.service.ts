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
import { ProductInfoService } from 'src/product-info/product-info.service';

@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOptionEntity) private productOptionRepository: Repository<ProductOptionEntity>,
    private readonly productService: ProductService,
    private readonly fileService: FileService,
    private readonly productInfoService: ProductInfoService,
  ) { }

  async create(createProductOptionDto: CreateProductOptionDto, files) {

    // 숙소 정보 가져오기
    let product;
    if (get(createProductOptionDto, 'productIdx', '')) {
      const productIdx = get(createProductOptionDto, 'productIdx');
      product = await this.productService.findIdxOne(+productIdx);
    }

    // 방 생활 시설 정보 가져오기
    let productInfo;
    if (get(createProductOptionDto, 'productInfoIdx', '')) {
      const productInfoIdx = get(createProductOptionDto, 'productInfoIdx').split(",");
      productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
    }

    // 방 정보
    const product_option_data = {
      status: +get(createProductOptionDto, 'status', 0),
      type: get(createProductOptionDto, 'type', ''),
      order: '10',
      code: await this.productOptionCreateCode(),
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
      // privateFacility: get(createProductOptionDto, 'privateFacility', ''),
      product: product,
      productInfo: productInfo,
    };
    if (get(createProductOptionDto, 'idx', '')) {
      product_option_data['idx'] = +get(createProductOptionDto, 'idx');
    }
    // 방 등록
    const productOptionEntity = await this.productOptionRepository.create(product_option_data);
    const productOption = await this.productOptionRepository.save(productOptionEntity);
    productOption['product'] = product;
    productOption['productInfo'] = productInfo;

    // 파일 제거
    const fileIdx = get(createProductOptionDto, 'filesIdx', '');
    let fileIdxs = [];
    if (fileIdx) {
      try {
        const productOptionFileIdxs = map(
          await this.fileService.findCategory(["roomDetailImg"], "" + productOption['idx']),
          (o) => "" + o.file_idx
        );
        fileIdxs = fileIdx.split(",");
        const delFileIdxs = productOptionFileIdxs.filter(o => !fileIdxs.includes(o));
        if (delFileIdxs.length > 0) {
          await this.fileService.removes(delFileIdxs);
        }
      } catch (error) {
        console.log({ error });
      }
    }

    // 새 첨부파일 등록
    let new_file;
    if (!isEmpty(files)) {
      new_file = await this.fileService.fileInfoInsert(files, productOption['idx']);
      fileIdxs = union(fileIdxs, ...map(new_file[product_option_data['idx']], (obj) => map(obj, o => "" + o.file_idx)));
    }

    let file_info;
    if (fileIdxs.length > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
    }

    return { productOption, file_info }
  }

  async productOptionCreateCode() {
    const code = commonUtils.generateRandomString(8).toUpperCase() + '-' + commonUtils.generateRandomNumber(4);
    const isCode = await this.productOptionRepository.findOne({
      where: { code: code }
    });

    if (isCode) {
      this.productOptionCreateCode();
    } else {
      return code;
    }
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    const [results, total] = await this.productOptionRepository.createQueryBuilder('product_option')
      .leftJoinAndSelect('product_option.product', 'product')
      .leftJoinAndSelect('product_option.productInfo', 'productInfo')
      .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
      .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
      .where((qb) => {
        qb.where('`product_option`.status IN (:status)', { status: get(where, 'status', ['2']) });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'title') });
        get(where, 'product_idx', '') && qb.andWhere('`product_option`.`productIdx` = :product_idx', { product_idx: get(where, 'product_idx') });
        get(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + get(where, 'title') + '%' });
        get(where, 'addr1', '') && qb.andWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + get(where, 'addr1') + '%' });
        get(where, 'addr2', '') && qb.andWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + get(where, 'addr2') + '%' });
        get(where, 'metro', '') && qb.andWhere('`product`.`metro` LIKE :metro', { metro: '%' + get(where, 'metro') + '%' });
        get(where, 'college', '') && qb.andWhere('`product`.`college` LIKE :college', { college: '%' + get(where, 'college') + '%' });
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_option_idxs = map(results, o => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], product_option_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
    });

    return { data, file_info }

  }

  async findOne(idx: number) {
    const productOption = await this.findIdx(idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [idx]);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('방 상세 이미지 파일 없음');
    }

    return { productOption, file_info }
  }

  async findIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const productOption = await this.productOptionRepository.findOne({
      where: { idx: idx },
      relations: ['product', 'product.productInfo', 'productInfo']
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
