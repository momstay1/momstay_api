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
const moment = require("moment");
const common_utils_1 = require("../common/common.utils");
const AWS = require('aws-sdk');
const storage_url = 'https://kr.object.ncloudstorage.com';
const endpoint = new AWS.Endpoint(storage_url);
const region = 'kr-standard';
const access_key = 'M9UeETnMpK9QgxoE0pRD';
const secret_key = 'lp5isd46v7suJG7Ok8wVnFkVVUdQbFJJRXOwAhlx';
const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key
    }
});
const bucket_name = 'momstay-storage';
const MAX_KEYS = 300;
const params = {
    Bucket: bucket_name,
    MaxKeys: MAX_KEYS,
    FetchOwner: true
};
const watermarkCategory = [
    'lodgingDetailImg',
    'mealsImg',
    'roomDetailImg',
    'site_og'
];
const img_url = '/file/img/';
const site_api_url = 'http://momstay_api.cf148.reconers.com';
let FileService = class FileService {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    create(createFileDto) {
        return 'This action adds a new file';
    }
    async uploadImg(files) {
        const filesInfo = common_utils_1.commonUtils.getArrayKey(files, ['fieldname'], true);
        return await this.fileInfoInsert(filesInfo, 1);
    }
    async uploadTempImg(files) {
        const filesInfo = common_utils_1.commonUtils.getArrayKey(files, ['fieldname'], true);
        return await this.fileInfoInsert(filesInfo, 0);
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
            where: qb => {
                qb.where('file_raw_name = :name OR file_watermark_name = :name', { name: name });
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
        try {
            const files = await this.findIndexs(idxs);
            await this.deleteFile(files);
            await this.deleteStorageFile(files);
            await this.fileRepository.createQueryBuilder()
                .delete()
                .where(" file_idx IN (:idxs)", { idxs: idxs })
                .execute();
        }
        catch (error) {
            console.log({ error });
            console.log('삭제할 파일이 없습니다', { idxs });
        }
    }
    async deleteStorageFile(files) {
        console.log('deleteStorageFile', { files });
        for (const key in files) {
            await S3.deleteObject({
                Bucket: bucket_name,
                Key: files[key].file_storage_path.replace(storage_url + '/', '')
            }).promise();
        }
    }
    async deleteFile(files) {
        console.log('deletFile', { files });
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
            if (fs.existsSync(files[key].file_watermark_name)) {
                try {
                    fs.unlinkSync(files[key].file_watermark_path);
                }
                catch (error) {
                    console.log('-------------------삭제할 워터마크 파일: ' + files[key].file_watermark_name);
                    console.log('-------------------없음');
                }
            }
        }
    }
    async fileInfoInsert(files, foreign_idx) {
        const files_data = [];
        let order = 1;
        const base_order = 10;
        const file_category = [];
        const folder = 'momstay/' + moment().format('YYYY-MM') + '/';
        for (const i in files) {
            file_category.push(i);
            for (const j in files[i]) {
                const raw_name = files[i][j].filename.split('.');
                const file_data = {
                    file_category: i,
                    file_foreign_idx: foreign_idx,
                    file_name: files[i][j].filename,
                    file_type: files[i][j].mimetype,
                    file_path: files[i][j].destination,
                    file_full_path: files[i][j].path,
                    file_storage_path: site_api_url + img_url + raw_name[0],
                    file_html_path: '',
                    file_html_full_path: img_url + raw_name[0],
                    file_html_thumb_path: '',
                    file_raw_name: raw_name[0],
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
                };
                order++;
                if (file_data.file_is_img) {
                    await this.sharpFile(file_data);
                    if (watermarkCategory.includes(i)) {
                        const watermark_name = raw_name[0] + '_watermark.' + raw_name[1];
                        file_data['file_watermark_name'] = watermark_name;
                        file_data['file_watermark_storage_path'] = site_api_url + img_url + watermark_name;
                        file_data['file_watermark_path'] = files[i][j].destination + '/' + watermark_name;
                        await this.fileWatermark(file_data);
                    }
                }
                files_data.push(file_data);
            }
        }
        await this.fileRepository
            .createQueryBuilder()
            .insert()
            .values(files_data)
            .execute();
        return await this.findCategoryFiles(file_category, foreign_idx);
    }
    async uploadStorage(file, file_data) {
        const folder = 'momstay/' + moment().format('YYYY-MM') + '/';
        await S3.putObject({
            Bucket: bucket_name,
            Key: folder + file.filename,
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
            ContentType: file.mimetype
        }).promise();
        if ((0, lodash_1.get)(file_data, 'file_watermark_name', '')) {
            await S3.putObject({
                Bucket: bucket_name,
                Key: folder + file_data.file_watermark_name,
                ACL: 'public-read',
                Body: fs.createReadStream(file.destination + '/' + file_data.file_watermark_name),
                ContentType: file.mimetype
            }).promise();
        }
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
        console.log('이미지 용량 및 사이즈 축소');
        console.log('이미지 경로: ', file.file_full_path);
        const fileBuffer = fs.readFileSync(file.file_full_path);
        const image = sharp(fileBuffer, { failOnError: false });
        const { format, width, height } = await image.metadata();
        if (width >= 1200) {
            console.log('이미지 넓이: ', { width });
            await image.resize(1200, null, { fit: 'contain' });
        }
        else if (height >= 1200) {
            console.log('이미지 높이: ', { height });
            await image.resize(null, 1200, { fit: 'contain' });
        }
        console.log('이미지 퀄리티 85% 줄이기');
        await image.withMetadata()
            .toFormat(format, { quality: 85 })
            .toFile(file.file_full_path, (err, info) => {
            console.log(`파일 압축 info :${JSON.stringify(info, null, 2)}`);
            console.log(`파일 압축 err :${JSON.stringify(err, null, 2)}`);
        })
            .toBuffer();
        console.log('이미지 용량 및 사이즈 축소 완료');
    }
    async fileWatermark(file_data) {
        console.log('이미지 워터마크');
        console.log('이미지 경로: ', file_data.file_full_path);
        const image = sharp(file_data.file_full_path, { failOnError: false });
        const { width, height } = await image.metadata();
        const watermark_img_local_path = './src/file/watermark/watermark.png';
        const watermark_img_path = '/home/momstay_api/wwwhost/src/file/watermark/watermark.png';
        const watermark = sharp(watermark_img_local_path, { failOnError: false });
        const multipleNum = width < height ? 3 : 4;
        console.log('워터마크 이미지 리사이즈');
        await watermark.resize(+(width / multipleNum).toFixed(), null, { fit: 'contain' });
        const watermarkBuffer = await watermark.toBuffer();
        console.log('이미지에 워터마크 추가');
        await image
            .rotate(null)
            .composite([{
                input: watermarkBuffer,
                gravity: 'southeast',
            }])
            .toFile(file_data.file_watermark_path, (err, info) => {
            console.log(`워터마크된 이미지 info : ${JSON.stringify(info, null, 2)}`);
            console.log(`워터마크된 이미지 err : ${JSON.stringify(err, null, 2)}`);
        });
        console.log('이미지에 워터마크 추가 완료');
    }
    async removeByRequest(dto, idx, category) {
        const fileIdx = (0, lodash_1.get)(dto, 'filesIdx', '');
        let fileIdxs = [];
        console.log('-----------------------파일 제거-----------------------');
        try {
            const File_idxs = (0, lodash_1.map)(await this.findCategory(category, "" + idx), (o) => "" + o.file_idx);
            fileIdxs = fileIdx ? fileIdx.split(",") : [];
            const delFileIdxs = File_idxs.filter(o => !fileIdxs.includes(o));
            console.log({ delFileIdxs });
            if (delFileIdxs.length > 0) {
                await this.removes(delFileIdxs);
            }
        }
        catch (error) {
            console.log(error['response']['message']);
        }
        return fileIdxs;
    }
    async createByRequest(files, idx) {
        let fileIdxs = [];
        if (!(0, lodash_1.isEmpty)(files)) {
            console.log('-----------------------새 첨부파일 등록-----------------------');
            const new_file = await this.fileInfoInsert(files, idx);
            fileIdxs = (0, lodash_1.map)(new_file[idx], (obj) => (0, lodash_1.map)(obj, o => "" + o.file_idx));
        }
        return fileIdxs;
    }
    async fileDownload() {
        const object_name = 'momstay/2023-02/00b83586-ab61-4d4a-b602-79c28da12cd8.jpg';
        const local_file_path = './src/file/tmp/test.jpg';
        let outStream = fs.createWriteStream(local_file_path);
        let inStream = S3.getObject({
            Bucket: bucket_name,
            Key: object_name
        }).createReadStream();
        console.log({ inStream });
        inStream.pipe(outStream);
        inStream.on('end', () => {
            console.log("Download Done");
        });
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map