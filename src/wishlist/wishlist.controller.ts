import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/getuser.decorator';

@Controller('wishlist')
@ApiTags('찜 API')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @Post()
  @ApiOperation({ summary: '찜 등록 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createWishlistDto: CreateWishlistDto
  ) {
    return this.wishlistService.create(user, createWishlistDto);
  }

  @Get()
  @ApiOperation({ summary: '찜 리스트 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async findAll(@GetUser() user: UsersEntity) {
    return await this.wishlistService.findUserAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
