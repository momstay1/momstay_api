import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductOptionEntity } from 'src/product-option/entities/product-option.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductEntity } from './entities/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
    private readonly fileService: FileService,
    // private readonly productService: ProductService,
    // private readonly productOptionService: ProductOptionService,
    // private readonly userService: UsersService,
  ) { }

  create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  async createOrderProduct(order: OrderEntity, po: ProductOptionEntity, createOrderDto) {
    // 추후 민터스 또는 그외 사이트 작업시 ProductOptionEntity => ProductOptionEntity[]로 변경
    // ProductOptionEntity[] 변경 후 아래 작업 반복문으로 작업 필요
    // 파일 정보 가져오기
    const file = await this.fileService.findCategoryForeignAll(['roomDetailImg'], [po['idx']]);

    // 부가세 계산방법 확인 후 변경
    // const surtax = commonUtils.getStatus('tax');
    // const fee = commonUtils.getStatus('fee');
    // 1번
    // let texPrice = commonUtils.calcTax(po['priceMonth'], surtax+'%');
    // let texPrice = commonUtils.calcTax(createOrderDto['price'], surtax + '%');
    // texPrice = commonUtils.calcTax(texPrice, fee + '%');
    // 2번
    // let texPrice = commonUtils.calcTax(po['priceMonth'], (surtax+fee)+'%');
    // let texPrice = commonUtils.calcTax(createOrderDto['price'], (surtax+fee)+'%');

    // 작업중
    const op_data = {
      status: +order['status'],
      eq: '001',
      code: order['code'] + '-001',
      productOptionIdx: '' + po['idx'],
      productOptionCode: po['product']['code'],
      productType: '1',
      parcelCode: order['code'] + '-P01',
      title: po['title'],
      options: po['code'],
      img: file[0]['file_storage_path'],
      userIdx: get(order, 'user', null),
      orderIdx: order,
    }

    if (get(createOrderDto, 'num', '')) op_data['num'] = get(createOrderDto, 'num');
    if (get(createOrderDto, 'price', '')) op_data['price'] = get(createOrderDto, 'price');
    if (get(createOrderDto, 'payPrice', '')) op_data['payPrice'] = get(createOrderDto, 'payPrice');
    if (get(createOrderDto, 'startAt', '')) op_data['startAt'] = get(createOrderDto, 'startAt');
    if (get(createOrderDto, 'endAt', '')) op_data['endAt'] = get(createOrderDto, 'endAt');
    if (get(createOrderDto, 'ClientMemo', '')) op_data['memo'] = get(createOrderDto, 'memo');

    const orderProduct_data = await this.orderProductRepository.create(op_data);
    const orderProduct = await this.orderProductRepository.save(orderProduct_data);
    return orderProduct;
  }

  findAll() {
    return `This action returns all orderProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
