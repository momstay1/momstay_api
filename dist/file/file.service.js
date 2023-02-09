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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const common_constants_1 = require("../common/common.constants");
const path = require("path");
const zl = require("zip-lib");
const fs = require("fs");
const sharp = require("sharp");
const img_url = '/file/img/';
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    create(createFileDto) {
        return 'This action adds a new file';
    }
    async uploadImg(files) {
        console.log({ files });
    }
    async ckeditorUploadImg(file) {
        const file_info = await this.fileInfoInsert({ ckeditor: file }, 0);
        return file_info[0].ckeditor;
    }
    findAll() {
        return `This action returns all file`;
    }
    async findOneName(name) {
        const file = await this.fileRepository.findOne({
            where: {
                file_raw_name: name
            }
        });
        if (!file) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        if (file.file_is_img == '0') {
            throw new common_1.UnsupportedMediaTypeException('이미지 파일이 아닙니다.');
        }
        return file;
    }
    async findOne(category, idx) {
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.Like)('%' + category + '%'),
                file_foreign_idx: idx
            }
        });
        if (files.length <= 0) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        return (0, lodash_1.keyBy)(files, (o) => o.file_category);
    }
    async findIndexsZip(idxs) {
        const files = await this.fileRepository.find({
            where: {
                file_foreign_idx: (0, typeorm_2.In)(idxs),
                file_category: (0, typeorm_2.In)(['dft_origin_img', 'dft_info_img'])
            }
        });
        if (files.length <= 0) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        return this.imageZip(files, 'selectImage');
    }
    async findIndexs(idxs) {
        const files = await this.fileRepository.find({
            where: {
                file_idx: (0, typeorm_2.In)(idxs),
            }
        });
        if (files.length <= 0) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        return files;
    }
    async findCategory(category, foreign_idx) {
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.In)(category),
                file_foreign_idx: foreign_idx
            }
        });
        if (files.length <= 0) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        return files;
    }
    async findCategoryForeignAll(category, foreign_idx) {
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.In)(category),
                file_foreign_idx: (0, typeorm_2.In)(foreign_idx)
            }
        });
        if (files.length <= 0) {
            throw new common_1.NotFoundException('존재하지 않는 파일 입니다.');
        }
        return files;
    }
    async findCategoryFiles(category, foreign_idx) {
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.In)(category),
                file_foreign_idx: foreign_idx
            }
        });
        const result = {};
        result[foreign_idx] = {};
        for (const key in files) {
            if (!result[foreign_idx][files[key].file_category]) {
                result[foreign_idx][files[key].file_category] = [];
            }
            result[foreign_idx][files[key].file_category].push(files[key]);
        }
        return result;
    }
    async findAllPlace(type, place_idx) {
    }
    update(id, updateFileDto) {
        return `This action updates a #${id} file`;
    }
    remove(id) {
        return `This action removes a #${id} file`;
    }
    async removes(idxs) {
        const files = await this.findIndexs(idxs);
        for (const key in files) {
            if (fs.existsSync(files[key].file_full_path)) {
                try {
                    fs.unlinkSync(files[key].file_full_path);
                }
                catch (error) {
                    console.log('-------------------삭제할 파일: ' + files[key].file_name);
                    console.log('-------------------없음');
                }
            }
        }
        await this.fileRepository.createQueryBuilder()
            .delete()
            .where(" file_idx IN (:idxs)", { idxs: idxs })
            .execute();
    }
    async fileInfoInsert(files, foreign_idx) {
        const files_data = [];
        let order = 1;
        const base_order = 10;
        const file_category = [];
        for (const i in files) {
            file_category.push(i);
            for (const j in files[i]) {
                const raw_name = files[i][j].filename.split('.')[0];
                files_data.push({
                    file_category: i,
                    file_foreign_idx: foreign_idx,
                    file_name: files[i][j].filename,
                    file_type: files[i][j].mimetype,
                    file_path: files[i][j].destination,
                    file_full_path: files[i][j].path,
                    file_html_path: '',
                    file_html_full_path: img_url + raw_name,
                    file_html_thumb_path: '',
                    file_raw_name: raw_name,
                    file_orig_name: files[i][j].originalname,
                    file_client_name: files[i][j].originalname,
                    file_ext: path.extname(files[i][j].originalname),
                    file_size: files[i][j].size,
                    file_is_img: this.isImage(files[i][j].mimetype),
                    file_image_width: '',
                    file_image_height: '',
                    file_image_type: '',
                    file_image_size_str: '',
                    file_order: base_order * order,
                });
                order++;
                console.log(files[i][j].originalname);
                await this.sharpFile(files[i][j]);
            }
        }
        await this.fileRepository
            .createQueryBuilder()
            .insert()
            .values(files_data)
            .execute();
        return await this.findCategoryFiles(file_category, foreign_idx);
    }
    isImage(type) {
        const png_mimes = ['image/x-png'];
        const jpeg_mimes = ['image/jpg', 'image/jpe', 'image/jpeg', 'image/pjpeg'];
        if (png_mimes.includes(type)) {
            type = 'image/png';
        }
        else if (jpeg_mimes.includes(type)) {
            type = 'image/jpeg';
        }
        const img_mimes = ['image/gif', 'image/jpeg', 'image/png'];
        return img_mimes.includes(type) ? 1 : 0;
    }
    async imageZip(files, type) {
        const zip = new zl.Zip();
        for (const key in files) {
            const change_file_name = path.join(files[key].file_path, files[key].file_name);
            let file_name = files[key].file_orig_name;
            if (files[key].file_category != 'dft_origin_img' && files[key].file_orig_name.indexOf('정보표시') == -1) {
                const temp_file_name = files[key].file_orig_name.split('.');
                file_name = temp_file_name[0] + '_정보표시.' + temp_file_name[1];
            }
            zip.addFile(change_file_name, file_name);
        }
        const zip_file_name = `${type}.zip`;
        const zip_file_path = path.join(common_constants_1.commonContants.zip_upload_path, zip_file_name);
        await zip.archive(zip_file_path);
        return { file_name: zip_file_name, file_path: zip_file_path };
    }
    async sharpFile(file) {
        const fileBuffer = fs.readFileSync(file.path);
        const image = await sharp(fileBuffer);
        const { format, width, height } = await image.metadata();
        if (width >= 1200) {
            await image.resize(1200, null, { fit: 'contain' });
        }
        if (height >= 1200) {
            await image.resize(null, 1200, { fit: 'contain' });
        }
        await image.withMetadata()
            .toFormat(format, { quality: 85 })
            .toFile(file.path, (err, info) => {
            console.log(`파일 압축 info :${JSON.stringify(info, null, 2)}`);
            console.log(`파일 압축 err :${JSON.stringify(err, null, 2)}`);
        })
            .toBuffer();
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map