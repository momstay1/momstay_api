import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getuser.decorator';
import { Auth } from 'src/common/decorator/role.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('block')
@ApiTags('차단 API')
export class BlockController {
  constructor(private readonly blockService: BlockService) { }

  @Post()
  @ApiOperation({
    summary: '회원 차단 등록 API',
    description: '차단된 회원 목록은 /user/profile api 조회시 확인 가능'
  })
  @Auth(['Any'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createBlockDto: CreateBlockDto
  ) {
    return await this.blockService.create(user, createBlockDto);
  }

  @Get()
  findAll() {
    // return this.blockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blockService.update(+id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockService.remove(+id);
  }
}
