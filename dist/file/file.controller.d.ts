/// <reference types="multer" />
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(createFileDto: CreateFileDto): string;
    uploadImg(files: Array<Express.Multer.File>): Promise<void>;
    uploadImg1(files: Array<Express.Multer.File>): Promise<boolean>;
    getFile(name: string, res: any): Promise<any>;
    downloadFile(name: string, res: any): Promise<void>;
    downloadsFile(type: string, place_idx: string, res: any): Promise<void>;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(id: string): string;
}
