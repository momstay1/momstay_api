import { RefreshTokenService } from './refresh-token.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
export declare class RefreshTokenController {
    private readonly refreshTokenService;
    constructor(refreshTokenService: RefreshTokenService);
    create(createRefreshTokenDto: CreateRefreshTokenDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRefreshTokenDto: UpdateRefreshTokenDto): string;
    remove(id: string): string;
}
