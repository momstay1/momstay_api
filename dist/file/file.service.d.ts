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
    uploadImg(files: Express.Multer.File[]): Promise<{}>;
    uploadTempImg(files: Express.Multer.File[]): Promise<{}>;
    ckeditorUploadImg(file: Express.Multer.File): Promise<any>;
    findAll(): string;
    findOneName(name: string): Promise<FileEntity>;
    findOne(category: string, idx: string): Promise<import("lodash").Dictionary<FileEntity>>;
    findIndexsZip(idxs: string[]): Promise<{
        file_name: string;
        file_path: string;
    }>;
    findIndexs(idxs: string[]): Promise<FileEntity[]>;
    findCategory(category: string[], foreign_idx: string): Promise<FileEntity[]>;
    findCategoryForeignAll(category: string[], foreign_idx: number[]): Promise<FileEntity[]>;
    findCategoryFiles(category: string[], foreign_idx: string): Promise<{}>;
    findAllPlace(type: string, place_idx: number): Promise<void>;
    update(id: number, updateFileDto: UpdateFileDto): string;
    remove(id: number): string;
    removes(idxs: string[]): Promise<void>;
    deleteStorageFile(files: any): Promise<void>;
    deleteFile(files: any): Promise<void>;
    fileInfoInsert(files: any, foreign_idx: any): Promise<{}>;
    uploadStorage(file: any, file_data: any): Promise<void>;
    isImage(type: any): 0 | 1;
    private imageZip;
    sharpFile(file: any): Promise<void>;
    fileWatermark(file_data: any): Promise<void>;
    removeByRequest(dto: any, idx: number, category: string[]): Promise<any[]>;
    createByRequest(files: any, idx: number): Promise<any[]>;
    fileDownload(): Promise<void>;
}
