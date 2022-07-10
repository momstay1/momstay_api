import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(GroupsEntity) private groupsRepository: Repository<GroupsEntity>) { }

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll(user) {
    const grp = await this.findOneName(user.user_group);
    return await this.groupsRepository.createQueryBuilder()
      .select()
      .where("grp_idx >= :grp_idx", { grp_idx: grp.grp_idx })
      .getMany();
  }

  async findOne(idx: number) {
    const group = await this.groupsRepository.findOne(idx);
    if (!group) {
      throw new NotFoundException('존재하지 않는 그룹 입니다.');
    }

    return group;
  }

  async findOneName(name: string) {
    const group = await this.groupsRepository.findOne({ grp_id: name });
    if (!group) {
      throw new NotFoundException('존재하지 않는 그룹 입니다.');
    }

    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
