import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity) private refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) { }

  create(createRefreshTokenDto: CreateRefreshTokenDto) {
    return 'This action adds a new refreshToken';
  }

  async insert(user: UsersEntity, jwt: ResponseAuthDto) {
    const refreshToken = await this.findUserOne(user.idx);
    const refresh_token_data = {
      token: jwt.refresh_token,
      user_idx: "" + user.idx,
      expriedAt: moment().add(30, 'days').format("YYYY-MM-DD HH:mm:ss")
    };
    if (refreshToken) {
      refresh_token_data['idx'] = refreshToken.idx;
    }
    await this.refreshTokenRepository.save(refresh_token_data);
  }

  findAll() {
    return `This action returns all refreshToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refreshToken`;
  }

  async findUserOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('잘못된 정보입니다.');
    }
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { user_idx: idx }
    });

    if (!refreshToken) {
      throw new NotFoundException('찾을 수 없습니다.');
    }
    return refreshToken;
  }

  async findJwtOne(jwt: string) {
    if (!jwt) {
      throw new NotFoundException('잘못된 정보입니다.');
    }
    const token = jwt.replace("Bearer ", "");
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token: token }
    });

    if (!refreshToken) {
      throw new NotFoundException('찾을 수 없습니다.');
    }
    return refreshToken;
  }

  update(id: number, updateRefreshTokenDto: UpdateRefreshTokenDto) {
    return `This action updates a #${id} refreshToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} refreshToken`;
  }
}
