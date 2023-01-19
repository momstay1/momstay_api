/// <reference types="multer" />
/// <reference types="lodash" />
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
export declare class FileService {
    private fileRepository;
    constructor(fileRepository: Repository<FileEntity>);
    create(createFileDto: CreateFileDto): string;
    uploadImg(files: Express.Multer.File[]): Promise<void>;
    ckeditorUploadImg(file: Express.Multer.File): Promise<any>;
    findAll(): string;
    findOneName(name: string): Promise<FileEntity>;
    findOne(category: string, idx: string): Promise<import("lodash").Dictionary<FileEntity>>;
    findIndexs(idxs: string[]): Promise<{
        file_name: string;
        file_path: string;
    }>;
    findCategory(category: string[], foreign_idx: string): Promise<{}>;
    findAllPlace(type: string, place_idx: number): Promise<void>;
    update(id: number, updateFileDto: UpdateFileDto): string;
    remove(id: number): string;
    fileInfoInsert(files: any, foreign_idx: any): Promise<{}>;
    isImage(type: any): 0 | 1;
    private imageZip;
}
