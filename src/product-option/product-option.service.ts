import { Injectable } from '@nestjs/common';
import { Pagination, PaginationOptions } from 'src/paginate';
import { commonUtils } from 'src/common/common.utils';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOptionEntity } from './entities/product-option.entity';
import { In, Repository } from 'typeorm';
import { get, isArray, isEmpty, map, merge, union } from 'lodash';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/file/file.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductInfoService } from 'src/product-info/product-info.service';
import { ExcelService } from 'src/excel/excel.service';

const registrationStatus = '2';
@Injectable()
export class ProductOptionService {
  constructor(
    @InjectRepository(ProductOptionEntity)
    private productOptionRepository: Repository<ProductOptionEntity>,
    private readonly productService: ProductService,
    private readonly fileService: FileService,
    private readonly productInfoService: ProductInfoService,
    private readonly excelService: ExcelService,
  ) {}

  async create(createProductOptionDto: CreateProductOptionDto, files) {
    // 숙소 정보 가져오기
    let product;
    if (get(createProductOptionDto, 'productIdx', '')) {
      const productIdx = get(createProductOptionDto, 'productIdx');
      product = await this.productService.findOneIdx(+productIdx);
    }

    // 방 생활 시설 정보 가져오기
    let productInfo;
    if (get(createProductOptionDto, 'productInfoIdx', '')) {
      const productInfoIdx = get(
        createProductOptionDto,
        'productInfoIdx',
      ).split(',');
      productInfo = await this.productInfoService.findAllIdxs(productInfoIdx);
    }

    // 방 정보
    const product_option_data = {
      order: '10',
      code: await this.productOptionCreateCode(),
      product: product,
      productInfo: productInfo,
    };

    if (get(createProductOptionDto, 'status', 0))
      product_option_data['status'] = +get(createProductOptionDto, 'status');
    if (get(createProductOptionDto, 'type', ''))
      product_option_data['type'] = get(createProductOptionDto, 'type');
    if (get(createProductOptionDto, 'stayStatus', ''))
      product_option_data['stayStatus'] = get(
        createProductOptionDto,
        'stayStatus',
      );
    if (get(createProductOptionDto, 'visitStatus', ''))
      product_option_data['visitStatus'] = get(
        createProductOptionDto,
        'visitStatus',
      );
    if (get(createProductOptionDto, 'paymentStatus', ''))
      product_option_data['paymentStatus'] = get(
        createProductOptionDto,
        'paymentStatus',
      );
    if (get(createProductOptionDto, 'title', ''))
      product_option_data['title'] = get(createProductOptionDto, 'title');
    if (get(createProductOptionDto, 'titleEng', ''))
      product_option_data['titleEng'] = get(createProductOptionDto, 'titleEng');
    if (get(createProductOptionDto, 'titleJpn', ''))
      product_option_data['titleJpn'] = get(createProductOptionDto, 'titleJpn');
    if (get(createProductOptionDto, 'titleChn', ''))
      product_option_data['titleChn'] = get(createProductOptionDto, 'titleChn');
    if (get(createProductOptionDto, 'price', ''))
      product_option_data['price'] = +get(createProductOptionDto, 'price');
    if (get(createProductOptionDto, 'priceMonth', ''))
      product_option_data['priceMonth'] = +get(
        createProductOptionDto,
        'priceMonth',
      );
    if (get(createProductOptionDto, 'priceWeek', ''))
      product_option_data['priceWeek'] = +get(
        createProductOptionDto,
        'priceWeek',
      );
    if (get(createProductOptionDto, 'priceDay', ''))
      product_option_data['priceDay'] = +get(
        createProductOptionDto,
        'priceDay',
      );
    if (get(createProductOptionDto, 'detailsKor', ''))
      product_option_data['detailsKor'] = get(
        createProductOptionDto,
        'detailsKor',
      );
    if (get(createProductOptionDto, 'detailsEng', ''))
      product_option_data['detailsEng'] = get(
        createProductOptionDto,
        'detailsEng',
      );
    if (get(createProductOptionDto, 'detailsJpn', ''))
      product_option_data['detailsJpn'] = get(
        createProductOptionDto,
        'detailsJpn',
      );
    if (get(createProductOptionDto, 'detailsChn', ''))
      product_option_data['detailsChn'] = get(
        createProductOptionDto,
        'detailsChn',
      );

    if (get(createProductOptionDto, 'idx', '')) {
      product_option_data['idx'] = +get(createProductOptionDto, 'idx');
    }
    // 방 등록
    const productOptionEntity = await this.productOptionRepository.create(
      product_option_data,
    );
    const productOption = await this.productOptionRepository.save(
      productOptionEntity,
    );
    productOption['product'] = product;
    productOption['productInfo'] = productInfo;

    // 파일 제거
    const fileIdx = get(createProductOptionDto, 'filesIdx', '');
    let fileIdxs = [];
    if (fileIdx) {
      try {
        const productOptionFileIdxs = map(
          await this.fileService.findCategory(
            ['roomDetailImg'],
            '' + productOption['idx'],
          ),
          (o) => '' + o.file_idx,
        );
        fileIdxs = fileIdx.split(',');
        const delFileIdxs = productOptionFileIdxs.filter(
          (o) => !fileIdxs.includes(o),
        );
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
      new_file = await this.fileService.fileInfoInsert(
        files,
        productOption['idx'],
      );
      fileIdxs = union(
        fileIdxs,
        ...map(new_file[product_option_data['idx']], (obj) =>
          map(obj, (o) => '' + o.file_idx),
        ),
      );
    }

    let file_info;
    if (fileIdxs.length > 0) {
      file_info = await this.fileService.findIndexs(fileIdxs);
    }

    return { productOption, file_info };
  }

  async productOptionCreateCode() {
    const code =
      commonUtils.generateRandomString(8).toUpperCase() +
      '-' +
      commonUtils.generateRandomNumber(4);
    const isCode = await this.productOptionRepository.findOne({
      where: { code: code },
    });

    if (isCode) {
      this.productOptionCreateCode();
    } else {
      return code;
    }
  }

  async findAll(options: PaginationOptions, search: string[], order: string) {
    const { take, page } = options;

    const where = commonUtils.searchSplit(search);
    where['status'] = get(where, 'status', [registrationStatus]);

    const alias = 'product_option';
    let order_by = commonUtils.orderSplit(order, alias);
    order_by[alias + '.createdAt'] = get(
      order_by,
      alias + '.createdAt',
      'DESC',
    );

    const [results, total] = await this.productOptionRepository
      .createQueryBuilder('product_option')
      .leftJoinAndSelect('product_option.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product_option.productInfo', 'productInfo')
      .leftJoinAndSelect(
        'product_info_product_product',
        'product_info_to_product',
        '`product`.idx = `product_info_to_product`.productIdx',
      )
      .leftJoinAndSelect(
        'product_info',
        'product_info',
        '`product_info`.idx = `product_info_to_product`.productInfoIdx',
      )
      .where((qb) => {
        qb.where('`product_option`.status IN (:status)', { status: isArray(where['status']) ? where['status'] : [where['status']] });
        get(where, 'membership', '') && qb.andWhere('`product`.`membership` = :membership', { membership: get(where, 'title') });
        get(where, 'product_idx', '') && qb.andWhere('`product_option`.`productIdx` = :product_idx', { product_idx: get(where, 'product_idx') });
        get(where, 'po_title', '') && qb.andWhere('`product_option`.`title` LIKE :po_title', { po_title: '%' + get(where, 'po_title') + '%' });
        get(where, 'name', '') && qb.andWhere('`user`.`name` LIKE :name', { name: '%' + get(where, 'name') + '%' });
        get(where, 'id', '') && qb.andWhere('`user`.`id` LIKE :id', { id: '%' + get(where, 'id') + '%' });
        get(where, 'title', '') && qb.andWhere('`product`.`title` LIKE :title', { title: '%' + get(where, 'title') + '%' });
        get(where, 'addr1', '') && qb.andWhere('`product`.`addr1` LIKE :addr1', { addr1: '%' + get(where, 'addr1') + '%' });
        get(where, 'addr2', '') && qb.andWhere('`product`.`addr2` LIKE :addr2', { addr2: '%' + get(where, 'addr2') + '%' });
        get(where, 'metro', '') && qb.andWhere('`product`.`metro` LIKE :metro', { metro: '%' + get(where, 'metro') + '%' });
        get(where, 'college', '') && qb.andWhere('`product`.`college` LIKE :college', { college: '%' + get(where, 'college') + '%' });
      })
      .orderBy(order_by)
      .skip(take * (page - 1) || 0)
      .take(take || 10)
      .getManyAndCount();

    const product_option_idxs = map(results, (o) => o.idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['roomDetailImg'],
        product_option_idxs,
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('방 리스트 이미지 파일 없음');
    }

    const data = new Pagination({
      results,
      total,
      page,
    });

    return { data, file_info };
  }

  async findOne(idx: number) {
    const productOption = await this.findIdx(idx);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(
        ['roomDetailImg'],
        [idx],
      );
      file_info = commonUtils.getArrayKey(
        file_info,
        ['file_foreign_idx', 'file_category'],
        true,
      );
    } catch (error) {
      console.log('방 상세 이미지 파일 없음');
    }

    return { productOption, file_info };
  }

  async findIdx(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const productOption = await this.productOptionRepository.findOne({
      where: { idx: idx },
      relations: [
        'product',
        'product.productInfo',
        'productInfo',
        'product.user',
        'product.user.device',
      ],
    });
    if (!get(productOption, 'idx')) {
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

  async excelDownload(
    options: PaginationOptions,
    search: string[],
    order: string,
  ) {
    const { data } = await this.findAll(options, search, order);
    if (!data) {
      throw new NotFoundException(
        'product-option.service.excel: 다운로드할 데이터가 없습니다.',
      );
    }
    return this.excelService.downloadExcel(data, {
      type: 'product_option',
    });
  }
}
