import { ResponseAuthDto } from 'src/auth/dto/response-auth.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
export declare class RefreshTokenService {
    private refreshTokenRepository;
    constructor(refreshTokenRepository: Repository<RefreshTokenEntity>);
    create(createRefreshTokenDto: CreateRefreshTokenDto): string;
    insert(user: UsersEntity, jwt: ResponseAuthDto): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    findUserOne(idx: number): Promise<RefreshTokenEntity>;
    findJwtOne(jwt: string): Promise<RefreshTokenEntity>;
    update(id: number, updateRefreshTokenDto: UpdateRefreshTokenDto): string;
    remove(id: number): string;
}
