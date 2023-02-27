import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, isEmpty, isObject, keyBy, map, sortBy, union } from 'lodash';
import { CollegeService } from 'src/college/college.service';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { MetroService } from 'src/metro/metro.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import * as moment from 'moment';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private readonly fileService: FileService,
    private readonly productInfoService: ProductInfoService,
    private readonly userService: UsersService,
    private readonly metroService: MetroService,
    private readonly collegeService: CollegeService,
  ) { }

  async test(id) {
    const code = await this.productCreateCode();
    console.log({ code });
    return code;
  }

  async create(createProductDto: CreateProductDto, files) {
    // 생활 및 편의 정보 가져오기
    let productInfo;
    let product_info_idxs;
    if (get(createProductDto, 'productInfoIdx', '')) {
      const productInfoIdx = get(createProductDto, 'productInfoIdx').split(",");
      productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
      // 필터 검색시 쿼리가 복잡해짐에 따라 간단한 검색 쿼리 사용을 위함
      product_info_idxs = sortBy(map(productInfoIdx, o => +o));
    }

    // 회원 정보 가져오기
    const userIdx = get(createProductDto, 'userIdx');
    const user = await this.userService.findIdx(+userIdx);

    // 지하철 및 대학교 정보 가져오기
    let metro = [];
    let college = [];
    if (get(createProductDto, 'metro', '')) {
      try {
        const metro_idxs = map(get(createProductDto, 'metro').split(','), o => +o);
        metro = await this.metroService.findAllIdx(metro_idxs);
      } catch (error) {
        console.log({ error });
      }
    }

    if (get(createProductDto, 'college', '')) {
      try {
        const college_idxs = map(get(createProductDto, 'college').split(','), o => +o);
        college = await this.collegeService.findAllIdx(college_idxs);
      } catch (error) {
        console.log({ error });
      }
    }

    // 숙소 정보
    const product_data = {
      status: +get(createProductDto, 'status', 0),
      type: get(createProductDto, 'type', ''),
      order: '10',
      code: await this.productCreateCode(),
      membership: get(createProductDto, 'membership', '0'),
      hostBusiness: get(createProductDto, 'hostBusiness', ''),
      title: get(createProductDto, 'title', ''),
      postCode: get(createProductDto, 'postCode', ''),
      addr1: get(createProductDto, 'addr1', ''),
      addr2: get(createProductDto, 'addr2', ''),
      language: get(createProductDto, 'language', ''),
      lat: get(createProductDto, 'lat', ''),
      lng: get(createProductDto, 'lng', ''),
      metro: metro,
      college: college,
      detailsKor: get(createProductDto, 'detailsKor', ''),
      detailsEng: get(createProductDto, 'detailsEng', ''),
      detailsJpn: get(createProductDto, 'detailsJpn', ''),
      detailsChn: get(createProductDto, 'detailsChn', ''),
      user: user,
      productInfo: productInfo,
      productInfoIdxs: ''
    };
    if (product_info_idxs && isArray(product_info_idxs)) {
      product_data['productInfoIdxs'] = product_info_idxs.join(',');
    }
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

  async productCreateCode() {
    const code = commonUtils.generateRandomString(8).toUpperCase() + '-' + commonUtils.generateRandomNumber(4);
    const isCode = await this.productRepository.findOne({
      where: { code: code }
    });

    if (isCode) {
      this.productCreateCode();
    } else {
      return code;
    }
  }

  async findAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);

    if (get(where, 'product_info', '')) {
      const product_info = sortBy(map(get(where, 'product_info').split(','), o => +o));
      where['product_info'] = product_info.join('%');
    }

    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .leftJoinAndSelect('product.metro', 'metro')
      .leftJoinAndSelect('product.college', 'college')
      .where((qb) => {
        qb.where('`product`.status IN (:status)', { status: get(where, 'status', ['2']) });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        get(where, 'user_idx', '') && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: get(where, 'user_idx') });
        get(where, 'stayStatus', '') && qb.andWhere('`product_option`.`stayStatus` = :stayStatus', { stayStatus: get(where, 'stayStatus') });
        get(where, 'min_priceMonth', '') && qb.andWhere('`product_option`.`priceMonth` >= :min_priceMonth', { min_priceMonth: get(where, 'min_priceMonth') });
        get(where, 'max_priceMonth', '') && qb.andWhere('`product_option`.`priceMonth` <= :max_priceMonth', { max_priceMonth: get(where, 'max_priceMonth') });
        get(where, 'product_info', '') && qb.where('`product`.productInfoIdxs LIKE :product_info', { product_info: '%' + get(where, 'product_info') + '%' });
        if (get(where, 'keyword', '')) {
          qb.andWhere('(' +
            '`product`.`title` LIKE :keyword' +
            ' OR `product`.`addr1` LIKE :keyword' +
            ' OR `product`.`addr2` LIKE :keyword' +
            ' OR `metro`.`stationKor` LIKE :keyword' +
            ' OR `college`.`nameKor` LIKE :keyword' +
            ' OR `metro`.`stationEng` LIKE :keyword' +
            ' OR `college`.`nameEng` LIKE :keyword' +
            ' OR `metro`.`stationJpn` LIKE :keyword' +
            ' OR `college`.`nameJpn` LIKE :keyword' +
            ' OR `metro`.`stationChn` LIKE :keyword' +
            ' OR `college`.`nameChn` LIKE :keyword' +
            ')',
            {
              keyword: '%' + get(where, 'keyword') + '%',
            }
          );
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_idxs = map(results, o => o.idx);
    let file_info = await this.getFileInfo(product_idxs);

    const data = new Pagination({
      results,
      total,
    });

    return { data, file_info }
  }

  async adminFindAll(options: PaginationOptions, search: string[]) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.metro', 'metro')
      .leftJoinAndSelect('product.college', 'college')
      .where((qb) => {
        qb.where('`product`.status IN (:status)', { status: get(where, 'status', ['2']) });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        get(where, 'user_idx', '') && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: get(where, 'user_idx') });
        if (get(where, 'keyword', '')) {
          qb.andWhere('(' +
            '`product`.`title` LIKE :keyword' +
            ' OR `product`.`addr1` LIKE :keyword' +
            ' OR `product`.`addr2` LIKE :keyword' +
            ' OR `metro`.`stationKor` LIKE :keyword' +
            ' OR `college`.`nameKor` LIKE :keyword' +
            ' OR `metro`.`stationEng` LIKE :keyword' +
            ' OR `college`.`nameEng` LIKE :keyword' +
            ' OR `metro`.`stationJpn` LIKE :keyword' +
            ' OR `college`.`nameJpn` LIKE :keyword' +
            ' OR `metro`.`stationChn` LIKE :keyword' +
            ' OR `college`.`nameChn` LIKE :keyword' +
            ')',
            {
              keyword: '%' + get(where, 'keyword') + '%',
            }
          );
        }
      })
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_idxs = map(results, o => o.idx);
    let file_info = await this.getFileInfo(product_idxs);

    const data = new Pagination({
      results,
      total,
    });

    return { data, file_info }
  }

  async findIdxAll(idx: number[]) {
    const product = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .where((qb) => {
        qb.where('`product_option`.status = :status', { status: 2 });
        qb.andWhere('`product`.idx IN (:idx)', { idx: idx });
      })
      .getMany();

    return product
  }

  async findOne(idx: number) {
    const product = await this.findIdxOne(idx);

    product['userIdx'] = get(product, ['user', 'idx'], 0);
    delete product.user;

    let file_info = await this.getFileInfo([idx]);

    return { product, file_info };
  }

  async adminFindOne(idx: number) {
    const product = await this.findIdxOne(idx);
    let file_info = await this.getFileInfo([idx]);
    return { product, file_info };
  }

  async getFileInfo(idxs: number[]) {
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('숙소 상세 이미지 파일 없음');
    }
    return file_info;
  }

  async findIdxOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const product = await this.productRepository.findOne({
      where: { idx: idx },
      relations: ['productInfo', 'user', 'metro', 'college']
    });
    if (!get(product, 'idx', '')) {
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
