import { Injectable } from '@nestjs/common';
import { CreateUserLeaveDto } from './dto/create-user-leave.dto';
import { UpdateUserLeaveDto } from './dto/update-user-leave.dto';

@Injectable()
export class UserLeaveService {
  create(createUserLeaveDto: CreateUserLeaveDto) {
    return 'This action adds a new userLeave';
  }

  findAll() {
    return `This action returns all userLeave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLeave`;
  }

  update(id: number, updateUserLeaveDto: UpdateUserLeaveDto) {
    return `This action updates a #${id} userLeave`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLeave`;
  }
}
