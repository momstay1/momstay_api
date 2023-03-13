import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter, get } from 'lodash';
import { UsersEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { BlockEntity } from './entities/block.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockEntity) private blockRepository: Repository<BlockEntity>,
    private readonly usersService: UsersService,
  ) { }

  async create(userInfo: UsersEntity, createBlockDto: CreateBlockDto) {
    const { blockUserIdx } = createBlockDto;
    const blockUserInfo = await this.usersService.findIdx(blockUserIdx);
    const user = await this.usersService.findId(userInfo['id']);
    const blockInfo = user['block'];

    const blockUser = filter(blockInfo, o => o['blockUserIdx'] == blockUserIdx);
    if (blockUser.length > 0) {
      throw new NotAcceptableException('block.service.create: 이미 차단한 회원입니다.');
    }

    const block_data = {
      blockUserIdx,
      user
    };
    const blockEntity = await this.blockRepository.create(block_data);
    const block = await this.blockRepository.save(blockEntity);

    return { block };
  }

  async findAllUser(userIdx: number) {
    if (!userIdx) {
      throw new NotFoundException('block.service.findAllUser: 조회할 회원 정보가 없습니다.');
    }
    const block = await this.blockRepository.find({
      where: { user: { idx: userIdx } },
      relations: ['user']
    });
    if (block.length <= 0) {
      throw new NotFoundException('block.service.findAllUser: 조회된 차단 목록이 없습니다.');
    }
    return block;
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
