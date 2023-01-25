import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductInfoDto } from './dto/create-product-info.dto';
import { UpdateProductInfoDto } from './dto/update-product-info.dto';
import { ProductInfoEntity } from './entities/product-info.entity';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectRepository(ProductInfoEntity) private productRepository: Repository<ProductInfoEntity>,
  ) { }

  create(createProductInfoDto: CreateProductInfoDto) {
    return 'This action adds a new productInfo';
  }

  async findAll() {
    const productInfo = await this.productRepository.find({
      where: { status: 2 }
    });
    if (productInfo.length <= 0) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }

    return productInfo;
  }

  async findAllIdxs(idxs: string[]) {
    if (idxs.length <= 0) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const productInfo = await this.productRepository.find({
      where: { idx: In(idxs) }
    });
    if (productInfo.length <= 0) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }
    return productInfo;
  }

  findOne(id: number) {
    return `This action returns a #${id} productInfo`;
  }

  update(id: number, updateProductInfoDto: UpdateProductInfoDto) {
    return `This action updates a #${id} productInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} productInfo`;
  }
}
