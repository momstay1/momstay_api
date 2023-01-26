import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
export declare class CollegeController {
    private readonly collegeService;
    constructor(collegeService: CollegeService);
    create(createCollegeDto: CreateCollegeDto): string;
    findAll(take: number, page: number, search: string[]): Promise<{
        results: import("./entities/college.entity").CollegeEntity[];
        total: number;
        pageTotal: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateCollegeDto: UpdateCollegeDto): string;
    remove(id: string): string;
}
