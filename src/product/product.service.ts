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
      detailsChn: get(createProductDto, 'detailsChn', ''),
      user: user,
      productInfo: productInfo,
    };
    // 숙소 등록
    const productEntity = await this.productRepository.create(product_data);
    const product = await this.productRepository.save(productEntity);

    // 파일 제거
    const fileIdx = get(createProductDto, 'filesIdx', '');
    let fileIdxs = [];
    if (fileIdx) {
      try {
        const productFileIdxs = map(
          await this.fileService.findCategory(["lodgingDetailImg", "mealsImg"], "" + product['idx']),
          (o) => "" + o.file_idx
        );
        fileIdxs = fileIdx.split(",");
        const delFileIdxs = productFileIdxs.filter(o => !fileIdxs.includes(o));
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
      new_file = await this.fileService.fileInfoInsert(files, product['idx']);
      fileIdxs = union(fileIdxs, ...map(new_file[product_data['idx']], (obj) => map(obj, o => "" + o.file_idx)));
    }

    let file_info;
    if (fileIdxs.length > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
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
    return await this.findIdxOne(idx);
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
