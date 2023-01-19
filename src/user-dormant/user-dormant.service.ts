import { Injectable } from '@nestjs/common';
import { CreateUserDormantDto } from './dto/create-user-dormant.dto';
import { UpdateUserDormantDto } from './dto/update-user-dormant.dto';

@Injectable()
export class UserDormantService {
  create(createUserDormantDto: CreateUserDormantDto) {
    return 'This action adds a new userDormant';
  }

  findAll() {
    return `This action returns all userDormant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDormant`;
  }

  update(id: number, updateUserDormantDto: UpdateUserDormantDto) {
    return `This action updates a #${id} userDormant`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDormant`;
  }
}
