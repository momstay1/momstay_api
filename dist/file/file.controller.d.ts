/// <reference types="multer" />
/// <reference types="lodash" />
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(createFileDto: CreateFileDto): string;
    ckeditorUploadImg(file: Express.Multer.File): Promise<any>;
    uploadImg(files: Array<Express.Multer.File>): Promise<{}>;
    uploadTempImg(files: Array<Express.Multer.File>): Promise<{}>;
    test(): Promise<void>;
    getFile(name: string, res: any): Promise<any>;
    getWatermarkFile(name: string, res: any): Promise<any>;
    selectDownloadFile(file: string, res: any): Promise<void>;
    downloadFile(name: string, res: any): Promise<void>;
    downloadsFile(type: string, place_idx: string, res: any): Promise<void>;
    getFileInfo(category: string, idx: string): Promise<import("lodash").Dictionary<import("./entities/file.entity").FileEntity>>;
    update(id: string, updateFileDto: UpdateFileDto): string;
    remove(id: string): string;
}
