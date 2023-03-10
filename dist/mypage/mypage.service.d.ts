import { CreateMypageDto } from './dto/create-mypage.dto';
import { UpdateMypageDto } from './dto/update-mypage.dto';
export declare class MypageService {
    create(createMypageDto: CreateMypageDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMypageDto: UpdateMypageDto): string;
    remove(id: number): string;
}
