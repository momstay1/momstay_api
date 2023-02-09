import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isEmpty, isObject, keyBy, map, union } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private readonly fileService: FileService,
    private readonly productInfoService: ProductInfoService,
    private readonly userService: UsersService,
  ) { }

  async create(createProductDto: CreateProductDto, files) {
    // 생활 및 편의 정보 가져오기
    let productInfo;
    if (get(createProductDto, 'productInfoIdx', '')) {
      const productInfoIdx = get(createProductDto, 'productInfoIdx').split(",");
      productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
    }

    const userIdx = get(createProductDto, 'userIdx');
    const user = await this.userService.findIdx(+userIdx);

    // 숙소 정보
    const product_data = {
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
      detailsChn: get(createProductDto, 'detailsChn', ''),
      user: user,
      productInfo: productInfo,
    };
    if (get(createProductDto, 'idx', '')) {
      product_data['idx'] = +get(createProductDto, 'idx');
    }
    // 숙소 등록
    const productEntity = await this.productRepository.create(product_data);
    const product = await this.productRepository.save(productEntity);

    // 파일 제거
    const fileIdx = get(createProductDto, 'filesIdx', '');
    let fileIdxs = [];
    if (fileIdx) {
      console.log('-----------------------파일 제거-----------------------');
      console.log({ fileIdx });
      try {
        const productFileIdxs = map(
          await this.fileService.findCategory(["lodgingDetailImg", "mealsImg"], "" + product['idx']),
          (o) => "" + o.file_idx
        );
        console.log({ productFileIdxs });
        fileIdxs = fileIdx.split(",");
        console.log({ fileIdxs });
        const delFileIdxs = productFileIdxs.filter(o => !fileIdxs.includes(o));
        console.log({ delFileIdxs });
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
      console.log('-----------------------새 첨부파일 등록-----------------------');
      console.log({ files });
      new_file = await this.fileService.fileInfoInsert(files, product['idx']);
      console.log({ new_file });
      fileIdxs = union(fileIdxs, ...map(new_file[product_data['idx']], (obj) => map(obj, o => "" + o.file_idx)));
      console.log({ fileIdxs });
    }

    let file_info;
    console.log('-----------------------파일 정보 가져오기-----------------------');
    console.log({ fileIdxs });
    if (fileIdxs.length > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
      console.log({ file_info });
    }

    return { product, file_info }
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
      .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
      .where((qb) => {
        qb.where('`product`.status IN (:status)', { status: get(where, 'status', ['2']) });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        get(where, 'user_idx', '') && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: get(where, 'user_idx') });
        if (get(where, 'keyword', '')) {
          qb.andWhere('(' +
            '`product`.`title` LIKE :title' +
            ' OR `product`.`addr1` LIKE :addr1' +
            ' OR `product`.`addr2` LIKE :addr2' +
            ' OR `product`.`metro` LIKE :metro' +
            ' OR `product`.`college` LIKE :college' +
            ')',
            {
              title: '%' + get(where, 'keyword') + '%',
              addr1: '%' + get(where, 'keyword') + '%',
              addr2: '%' + get(where, 'keyword') + '%',
              metro: '%' + get(where, 'keyword') + '%',
              college: '%' + get(where, 'keyword') + '%',
            }
          );
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_idxs = map(results, o => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], product_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('숙소 리스트 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
    });

    return { data, file_info }
  }

  async findIdxAll(idx: number[]) {
    const product = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product_info_product_product', 'product_info_to_product', '`product`.idx = `product_info_to_product`.productIdx')
      .leftJoinAndSelect('product_info', 'product_info', '`product_info`.idx = `product_info_to_product`.productInfoIdx')
      .where((qb) => {
        qb.where('`product_option`.status = :status', { status: 2 });
        qb.andWhere('`product`.idx IN (:idx)', { idx: idx });
      })
      .getMany();

    return product
  }

  async findOne(idx: number) {
    const product = await this.findIdxOne(idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], [idx]);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('숙소 상세 이미지 파일 없음');
    }
    return { product, file_info };
  }

  async findIdxOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const product = await this.productRepository.findOne({
      where: { idx: idx },
      relations: ['productInfo']
    });
    if (!product.idx) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
