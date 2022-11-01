"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ckeditorMulterOptions = void 0;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const common_constants_1 = require("./common.constants");
const createFolder = (folder) => {
    console.log('createFolder', { folder });
    try {
        fs.mkdirSync(common_constants_1.commonContants.ckeditor_upload_path);
    }
    catch (error) {
        console.log('The folder already exists...');
    }
    try {
        console.log(`Create a ${folder} uploads folder...`);
        fs.mkdirSync(path.join(common_constants_1.commonContants.ckeditor_upload_path, `${folder}`));
    }
    catch (error) {
        console.log(`The ${folder} folder already exists...`);
    }
};
const storage = () => {
    return multer.diskStorage({
        destination(req, file, cb) {
            const folder = 'ckeditor';
            createFolder(folder);
            const folder_name = path.join(common_constants_1.commonContants.ckeditor_upload_path, folder);
            cb(null, folder_name);
        },
        filename(req, file, cb) {
            const file_name = uuidRandom(file);
            console.log('filename', { file_name });
            cb(null, file_name);
        },
    });
};
const fileFilter = (req, file, cb) => {
    cb(null, true);
};
const uuidRandom = (file) => {
    return `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
};
const ckeditorMulterOptions = () => {
    const result = {
        storage: storage(),
        fileFilter: fileFilter,
    };
    return result;
};
exports.ckeditorMulterOptions = ckeditorMulterOptions;
//# sourceMappingURL=common.ckeditor.js.map