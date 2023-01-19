import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    create(createLoginDto: CreateLoginDto): void;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLoginDto: UpdateLoginDto): string;
    remove(id: string): string;
}
