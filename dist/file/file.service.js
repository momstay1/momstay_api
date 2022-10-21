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
const defect_service_1 = require("../defect/defect.service");
const path = require("path");
const zl = require("zip-lib");
const img_url = '/file/img/';
let FileService = class FileService {
    constructor(fileRepository, defectService) {
        this.fileRepository = fileRepository;
        this.defectService = defectService;
    }
    create(createFileDto) {
        return 'This action adds a new file';
    }
    async uploadImg(files) {
        console.log({ files });
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
    async findIndexs(idxs) {
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
    async findCategory(category, foreign_idx) {
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.In)(category),
                file_foreign_idx: foreign_idx
            }
        });
        const result = {};
        result[foreign_idx] = (0, lodash_1.keyBy)(files, (o) => {
            return o.file_category;
        });
        return result;
    }
    async findAllPlace(type, place_idx) {
        const dft_idxs = await this.defectService.findAllPlaceIdxs([+place_idx]);
        const file_category = [];
        if (type == 'all') {
            file_category.push('dft_origin_img', 'dft_info_img');
        }
        else {
            file_category.push('dft_' + type + '_img');
        }
        const files = await this.fileRepository.find({
            where: {
                file_category: (0, typeorm_2.In)(file_category),
                file_foreign_idx: (0, typeorm_2.In)(dft_idxs),
            }
        });
        return this.imageZip(files, type);
    }
    update(id, updateFileDto) {
        return `This action updates a #${id} file`;
    }
    remove(id) {
        return `This action removes a #${id} file`;
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
            }
        }
        await this.fileRepository
            .createQueryBuilder()
            .insert()
            .values(files_data)
            .execute();
        return await this.findCategory(file_category, foreign_idx);
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
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => defect_service_1.DefectService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        defect_service_1.DefectService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map