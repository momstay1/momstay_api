import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { LoginEntity } from './entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity) private loginRepository: Repository<LoginEntity>,
  ) { }
  async create(user, req) {
    const login = await this.loginRepository.create({
      ip: req.ip,
      agent: req.get('user-agent'),
      user: user.idx
    });
    await this.loginRepository.save(login);
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
