import { MetroService } from './metro.service';
import { CreateMetroDto } from './dto/create-metro.dto';
import { UpdateMetroDto } from './dto/update-metro.dto';
export declare class MetroController {
    private readonly metroService;
    constructor(metroService: MetroService);
    create(createMetroDto: CreateMetroDto): string;
    findAll(take: number, page: number, search: string[]): Promise<{
        results: import("./entities/metro.entity").MetroEntity[];
        total: number;
        pageTotal: number;
    }>;
    findOne(id: string): string;
    update(id: string, updateMetroDto: UpdateMetroDto): string;
    remove(id: string): string;
}
