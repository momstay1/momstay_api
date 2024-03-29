import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(GroupsEntity) private groupsRepository: Repository<GroupsEntity>) { }

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  async findAll() {
    return await this.groupsRepository.find();
  }

  async findAllUser(user) {
    console.log({ user });
    const grp = await this.findOneName(user.group);
    return await this.groupsRepository.createQueryBuilder()
      .select()
      .where("idx >= :idx", { idx: grp.idx })
      .getMany();
  }

  async findAllName(group) {
    const group_name = group.split('|');

    const groups = await this.groupsRepository.find({
      where: { id: In(group_name) }
    });
    if (groups.length <= 0) {
      throw new NotFoundException('존재하지 않는 그룹 입니다.');
    }

    return groups;
  }

  async findOne(idx: number) {
    const group = await this.groupsRepository.findOne(idx);
    if (!group) {
      throw new NotFoundException('존재하지 않는 그룹 입니다.');
    }

    return group;
  }

  async findIdxs(idxs: number[]) {
    const groups = await this.groupsRepository.find({
      where: { idx: In(idxs) }
    });
    if (!groups) {
      throw new NotFoundException('존재하지 않는 그룹 입니다.');
    }

    return groups;
  }

  async findOneName(name: string) {
    const group = await this.groupsRepository.findOne({ id: name });
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
