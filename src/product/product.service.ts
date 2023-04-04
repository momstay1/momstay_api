import { Injectable } from '@nestjs/common';
import { NotAcceptableException, NotFoundException } from '@nestjs/common/exceptions';
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
import { UsersEntity } from 'src/users/entities/user.entity';

const registrationStatus = '2';
const deleteStatus = -1;
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

    // 숙소 정보 가져오기
    let prd;
    if (get(createProductDto, 'idx', '')) {
      try {
        prd = await this.findOneIdx(+get(createProductDto, 'idx'));
      } catch (error) {
        console.log({ error });
      }
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
      order: '10',
      code: await this.productCreateCode(),
      metro: metro,
      college: college,
      user: user,
      productInfo: productInfo,
      productInfoIdxs: ''
    };

    if (prd) {
      product_data['order'] = prd['order'];
      product_data['code'] = prd['code'];
    } else {
      product_data['order'] = '10';
      product_data['code'] = await this.productCreateCode();
    }
    if (get(createProductDto, 'idx', '')) product_data['idx'] = +get(createProductDto, 'idx');
    if (get(createProductDto, 'status', 0)) product_data['status'] = +get(createProductDto, 'status');
    if (get(createProductDto, 'type', '')) product_data['type'] = get(createProductDto, 'type');
    if (get(createProductDto, 'membership', '')) product_data['membership'] = get(createProductDto, 'membership');
    if (get(createProductDto, 'hostBusiness', '')) product_data['hostBusiness'] = get(createProductDto, 'hostBusiness');
    if (get(createProductDto, 'title', '')) product_data['title'] = get(createProductDto, 'title');
    if (get(createProductDto, 'titleEng', '')) product_data['titleEng'] = get(createProductDto, 'titleEng');
    if (get(createProductDto, 'titleJpn', '')) product_data['titleJpn'] = get(createProductDto, 'titleJpn');
    if (get(createProductDto, 'titleChn', '')) product_data['titleChn'] = get(createProductDto, 'titleChn');
    if (get(createProductDto, 'postCode', '')) product_data['postCode'] = get(createProductDto, 'postCode');
    if (get(createProductDto, 'addr1', '')) product_data['addr1'] = get(createProductDto, 'addr1');
    if (get(createProductDto, 'addr1Eng', '')) product_data['addr1Eng'] = get(createProductDto, 'addr1Eng');
    if (get(createProductDto, 'addr1Jpn', '')) product_data['addr1Jpn'] = get(createProductDto, 'addr1Jpn');
    if (get(createProductDto, 'addr1Chn', '')) product_data['addr1Chn'] = get(createProductDto, 'addr1Chn');
    if (get(createProductDto, 'addr2', '')) product_data['addr2'] = get(createProductDto, 'addr2');
    if (get(createProductDto, 'addr2Eng', '')) product_data['addr2Eng'] = get(createProductDto, 'addr2Eng');
    if (get(createProductDto, 'addr2Jpn', '')) product_data['addr2Jpn'] = get(createProductDto, 'addr2Jpn');
    if (get(createProductDto, 'addr2Chn', '')) product_data['addr2Chn'] = get(createProductDto, 'addr2Chn');
    if (get(createProductDto, 'language', '')) product_data['language'] = get(createProductDto, 'language');
    if (get(createProductDto, 'lat', '')) product_data['lat'] = get(createProductDto, 'lat');
    if (get(createProductDto, 'lng', '')) product_data['lng'] = get(createProductDto, 'lng');
    if (get(createProductDto, 'detailsKor', '')) product_data['detailsKor'] = get(createProductDto, 'detailsKor');
    if (get(createProductDto, 'detailsEng', '')) product_data['detailsEng'] = get(createProductDto, 'detailsEng');
    if (get(createProductDto, 'detailsJpn', '')) product_data['detailsJpn'] = get(createProductDto, 'detailsJpn');
    if (get(createProductDto, 'detailsChn', '')) product_data['detailsChn'] = get(createProductDto, 'detailsChn');
    if (get(createProductDto, 'status', '')) product_data['status'] = +get(createProductDto, 'status');
    if (get(createProductDto, 'status', '')) product_data['status'] = +get(createProductDto, 'status');

    if (product_info_idxs && isArray(product_info_idxs)) {
      product_data['productInfoIdxs'] = product_info_idxs.join(',');
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
      fileIdxs = union(fileIdxs, ...map(new_file[product['idx']], (obj) => map(obj, o => "" + o.file_idx)));
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

  async findAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [registrationStatus]);

    if (get(where, 'product_info', '')) {
      const product_info = sortBy(map(get(where, 'product_info'), o => +o));
      where['product_info'] = product_info.join('%');
    }

    const alias = 'product';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .leftJoinAndSelect('product.metro', 'metro')
      .leftJoinAndSelect('product.college', 'college')
      .where((qb) => {
        qb.where('`product`.status IN (:status)', { status: isArray(get(where, 'status')) ? get(where, 'status') : [get(where, 'status')] });
        (get(where, 'membership', '')) && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        (get(where, 'user_idx', '')) && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: get(where, 'user_idx') });
        (get(where, 'stayStatus', '')) && qb.andWhere('`product_option`.`stayStatus` = :stayStatus', { stayStatus: get(where, 'stayStatus') });
        (get(where, 'min_priceMonth', '')) && qb.andWhere('`product_option`.`priceMonth` >= :min_priceMonth', { min_priceMonth: +get(where, 'min_priceMonth') });
        (get(where, 'max_priceMonth', '')) && qb.andWhere('`product_option`.`priceMonth` <= :max_priceMonth', { max_priceMonth: +get(where, 'max_priceMonth') });
        (get(where, 'product_info', '')) && qb.andWhere('`product`.productInfoIdxs LIKE :product_info', { product_info: '%' + get(where, 'product_info') + '%' });
        if (get(where, 'keyword', '')) {
          qb.andWhere('(' +
            '`product`.`title` LIKE :keyword' +
            ' OR `product`.`titleEng` LIKE :keyword' +
            ' OR `product`.`titleJpn` LIKE :keyword' +
            ' OR `product`.`titleChn` LIKE :keyword' +
            ' OR `product`.`addr1` LIKE :keyword' +
            ' OR `product`.`addr2` LIKE :keyword' +
            ' OR `product`.`addr1Eng` LIKE :keyword' +
            ' OR `product`.`addr2Eng` LIKE :keyword' +
            ' OR `product`.`addr1Jpn` LIKE :keyword' +
            ' OR `product`.`addr2Jpn` LIKE :keyword' +
            ' OR `product`.`addr1Chn` LIKE :keyword' +
            ' OR `product`.`addr2Chn` LIKE :keyword' +
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
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_idxs = map(results, o => o.idx);
    let file_info = await this.getFileInfo(product_idxs);

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info }
  }

  async adminFindAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [registrationStatus]);

    const alias = 'product';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(order_by, alias + '.createdAt', 'DESC');

    const [results, total] = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.metro', 'metro')
      .leftJoinAndSelect('product.college', 'college')
      .where((qb) => {
        qb.where('`product`.status IN (:status)', { status: isArray(get(where, 'status')) ? get(where, 'status') : [get(where, 'status')] });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'membership') });
        (get(where, 'title', '')) && qb.andWhere('`product`.title LIKE :title', { title: '%' + get(where, 'title') + '%' });
        (get(where, 'name', '')) && qb.andWhere('`user`.name LIKE :name', { name: '%' + get(where, 'name') + '%' });
        // get(where, 'user_idx', '') && qb.andWhere('`product`.`userIdx` = :user_idx', { user_idx: get(where, 'user_idx') });
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
      .orderBy(order_by)
      .skip((take * (page - 1) || 0))
      .take((take || 10))
      .getManyAndCount();

    const product_idxs = map(results, o => o.idx);
    let file_info = await this.getFileInfo(product_idxs);

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info }
  }

  async findIdxAll(idx: number[]) {
    const product = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .where((qb) => {
        qb.andWhere('`product`.idx IN (:idx)', { idx: idx });
      })
      .getMany();

    return product
  }

  async findAllUser(userIdx: number) {
    const products = await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.productOption', 'product_option')
      .leftJoinAndSelect('product.productInfo', 'product_info')
      .leftJoinAndSelect('product.user', 'user')
      .where((qb) => {
        qb.andWhere('`user`.idx = :userIdx', { userIdx: userIdx });
      })
      .getMany();

    return products;
  }

  async findOne(idx: number) {
    const product = await this.findOneIdx(idx);

    product['userIdx'] = get(product, ['user', 'idx'], 0);
    delete product.user;

    let file_info = await this.getFileInfo([idx]);

    return { product, file_info };
  }

  async adminFindOne(idx: number) {
    const product = await this.findOneIdx(idx);
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

  async findOneIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('product.service.findOneIdx: 잘못된 정보 입니다.');
    }
    const product = await this.productRepository.findOne({
      where: { idx: idx },
      relations: ['productInfo', 'user', 'metro', 'college']
    });
    if (!get(product, 'idx', '')) {
      throw new NotFoundException('product.service.findOneIdx: 정보를 찾을 수 없습니다.');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async updateAverageStar(idx: number, { star, reviewCount }) {
    await this.productRepository.createQueryBuilder()
      .update(ProductEntity)
      .set({ star, reviewCount })
      .where(" idx = :idx", { idx: idx })
      .execute()
  }

  async updateMembership(userIdx: number, membershipStatus: string) {
    const products = await this.findAllUser(userIdx);
    const productIdxs = map(products, o => o['idx']);
    await this.productRepository.createQueryBuilder()
      .update(ProductEntity)
      .set({ membership: membershipStatus })
      .where(" idx IN (:idx)", { idx: productIdxs })
      .execute()
  }

  async hostRemove(userIinfo, idx: number) {
    // 회원의 숙소인이 확인
    if (!commonUtils.isAdmin(userIinfo.group)) {
      // 관리자가 아닌 경우
      // 회원 정보 가져오기
      const user = await this.userService.findId(userIinfo.id);
      const product = await this.findOneIdx(idx);
      if (user.idx != product.user.idx) {
        // 방 호스트가 아닌 경우
        throw new NotAcceptableException('product.service.hostRemove: 삭제 권한이 없습니다.');
      }
    }

    await this.remove(idx);
  }

  async remove(idx: number) {
    await this.productRepository.createQueryBuilder()
      .update(ProductEntity)
      .set({ status: deleteStatus })
      .where(" idx = :idx", { idx: idx })
      .execute()
  }
}
