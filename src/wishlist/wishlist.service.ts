import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { ProductService } from 'src/product/product.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistEntity } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistEntity) private wishlistRepository: Repository<WishlistEntity>,
    private readonly userService: UsersService,
    private readonly productService: ProductService,
    private readonly fileService: FileService
  ) { }

  async create(user: UsersEntity, createWishlistDto: CreateWishlistDto) {
    const user_data = await this.userService.findId(user.id);
    let wishlist;
    try {
      // 찜목록 존재하는 경우 삭제
      wishlist = await this.findUserProOne(user_data.idx, createWishlistDto.product_idx);
      this.remove(wishlist.idx);
      return {};
    } catch (error) {
      // findUserProOne 함수에서 찜목록 없는 경우 에러 발생
      // 찜목록 생성
      wishlist = await this.wishlistRepository.save({
        product_idx: createWishlistDto.product_idx,
        user_idx: user_data.idx
      });
    }
    return wishlist;
  }

  findAll() {
    return `This action returns all wishlist`;
  }

  async findUserAll(userInfo: UsersEntity) {
    const user = await this.userService.findId(userInfo['id']);
    const wishlist = await this.wishlistRepository.find({
      where: { user_idx: user['idx'] }
    });
    if (!wishlist) {
      throw new NotFoundException('찜 목록이 없습니다.');
    }
    const wishlist_idxs = map(wishlist, o => o['product_idx']);
    const product = await this.productService.findIdxAll(wishlist_idxs);
    let file_info = {};
    try {
      file_info = await this.fileService.findCategoryForeignAll(['lodgingDetailImg', 'mealsImg'], wishlist_idxs);
      file_info = commonUtils.getArrayKey(file_info, ['file_foreign_idx', 'file_category'], true);
    } catch (error) {
      console.log('위시리스트에 이미지 파일 없음');
    }
    return { product, file_info };
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  async findUserProOne(user_idx: number, product_idx: number) {
    if (!user_idx || !product_idx) {
      throw new NotFoundException('잘못된 정보 입니다.');
    }
    const wishlist = await this.wishlistRepository.findOne({
      where: { user_idx: user_idx, product_idx: product_idx },
    });
    if (!wishlist) {
      throw new NotFoundException('찜 목록이 없습니다.');
    }
    return wishlist;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  async remove(idx: number) {
    await this.wishlistRepository.delete(idx);
  }
}
