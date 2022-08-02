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
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createFileDto) {
        return this.fileService.create(createFileDto);
    }
    async uploadImg(files) {
        return await this.fileService.uploadImg(files);
    }
    async uploadImg1(files) {
        console.log({ files });
        console.log(files['dft_origin_img']);
        console.log(files['dft_info_img']);
        return true;
    }
    async getFile(name, res) {
        const file = await this.fileService.findOne(name);
        return res.sendFile(file.file_full_path);
    }
    async downloadFile(name, res) {
        const file = await this.fileService.findOne(name);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + file.file_orig_name + '"',
        });
        (0, fs_1.createReadStream)(file.file_full_path).pipe(res);
    }
    async downloadsFile(type, place_idx, res) {
        const zip = await this.fileService.findAllPlace(type, +place_idx);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="' + zip.file_name + '"',
        });
        (0, fs_1.createReadStream)(zip.file_path).pipe(res);
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image', 10, (0, common_file_1.multerOptions)())),
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImg", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'dft_origin_img', maxCount: 10 },
        { name: 'dft_info_img', maxCount: 10 },
    ], (0, common_file_1.multerOptions)())),
    (0, common_1.Post)('upload1'),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImg1", null);
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
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map