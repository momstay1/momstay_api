import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    // private readonly productService: ProductService,
    // private readonly productOptionService: ProductOptionService,
    // private readonly userService: UsersService,
  ) { }

  create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  async createOrderProduct(order: OrderEntity, po: ProductOptionEntity) {
    // 작업중
    const op_data = {
      status: order['status'],
      eq: '001',
      code: order['code'] + '-001',
      productIdx: po['product']['idx'],
      // productCode: po['product']['code'],
      productType: '1',
      parcelCode: order['code'] + '-P01',
      title: po['product']['title']

    }
    const orderProduct_data = await this.orderProductRepository.create();
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
