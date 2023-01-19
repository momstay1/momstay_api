import { Repository } from 'typeorm';
import { UpdateLoginDto } from './dto/update-login.dto';
import { LoginEntity } from './entities/login.entity';
export declare class LoginService {
    private loginRepository;
    constructor(loginRepository: Repository<LoginEntity>);
    create(user: any, req: any): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLoginDto: UpdateLoginDto): string;
    remove(id: number): string;
}
