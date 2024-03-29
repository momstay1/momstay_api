"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const create_file_dto_1 = require("./dto/create-file.dto");
const update_file_dto_1 = require("./dto/update-file.dto");
const platform_express_1 = require("@nestjs/platform-express");
const common_file_1 = require("../common/common.file");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const common_ckeditor_1 = require("../common/common.ckeditor");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createFileDto) {
        return this.fileService.create(createFileDto);
    }
    async ckeditorUploadImg(file) {
        return await this.fileService.ckeditorUploadImg(file);
    }
    async uploadImg(files) {
        console.log(files);
        return this.fileService.uploadImg(files);
    }
    async uploadTempImg(files) {
        return this.fileService.uploadTempImg(files);
    }
    async test() {
        await this.fileService.fileDownload();
    }
    async getFile(name, res) {
        const file = await this.fileService.findOneName(name);
        return res.sendFile(file.file_watermark_path || file.file_full_path);
    }
    async getWatermarkFile(name, res) {
        const file = await this.fileService.findOneName(name);
        return res.sendFile(file.file_watermark_path);
    }
    async selectDownloadFile(file, res) {
        const files = await this.fileService.findIndexsZip(file.split(','));
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + encodeURI(files.file_name) + '"',
        });
        (0, fs_1.createReadStream)(files.file_path).pipe(res);
    }
    async downloadFile(name, res) {
        console.log({ name });
        const file = await this.fileService.findOneName(name);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + encodeURI(file.file_orig_name) + '"',
        });
        (0, fs_1.createReadStream)(file.file_full_path).pipe(res);
    }
    async downloadsFile(type, place_idx, res) {
    }
    async getFileInfo(category, idx) {
        return await this.fileService.findOne(category, idx);
    }
    update(id, updateFileDto) {
        return this.fileService.update(+id, updateFileDto);
    }
    remove(id) {
        return this.fileService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_dto_1.CreateFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('ckeditor', 10, (0, common_ckeditor_1.ckeditorMulterOptions)())),
    (0, common_1.Post)('ckeditor/upload'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "ckeditorUploadImg", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: '이미지 업로드 API' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)((0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImg", null);
__decorate([
    (0, common_1.Post)('upload/temp'),
    (0, swagger_1.ApiOperation)({ summary: '임시 파일 업로드 API' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)((0, common_file_1.multerOptions)())),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadTempImg", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('img/:name'),
    (0, swagger_1.ApiOperation)({ summary: '이미지 파일 API' }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('watermark_img/:name'),
    (0, swagger_1.ApiOperation)({ summary: '워터마크 이미지 파일 API' }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getWatermarkFile", null);
__decorate([
    (0, common_1.Get)('downloads/select'),
    (0, swagger_1.ApiOperation)({ summary: '선택 이미지 파일 다운로드 API' }),
    __param(0, (0, common_1.Query)('file')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "selectDownloadFile", null);
__decorate([
    (0, common_1.Get)('download/:name'),
    (0, swagger_1.ApiOperation)({ summary: '이미지 파일 다운로드 API' }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Get)('downloads/:type/:place_idx'),
    (0, swagger_1.ApiOperation)({ summary: '현장이미지 파일 전체 다운로드 API' }),
    (0, swagger_1.ApiParam)({
        name: 'type',
        description: 'all(전체)|origin(원본)|info(정보표시된)',
    }),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('place_idx')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "downloadsFile", null);
__decorate([
    (0, common_1.Get)(':category/:idx'),
    (0, swagger_1.ApiOperation)({ summary: '파일 정보 API' }),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Param)('idx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileInfo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_file_dto_1.UpdateFileDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "remove", null);
FileController = __decorate([
    (0, common_1.Controller)('file'),
    (0, swagger_1.ApiTags)('파일 API'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map