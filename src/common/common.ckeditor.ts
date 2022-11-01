import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import { extname } from "path";
import { v4 as uuid } from 'uuid';
import { commonContants } from "./common.constants";

const createFolder = (folder: string) => {
  console.log('createFolder', { folder });
  try {
    fs.mkdirSync(commonContants.ckeditor_upload_path); //폴더를 만드는 명령어
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(commonContants.ckeditor_upload_path, `${folder}`)); //폴더 생성
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (): multer.StorageEngine => {
  return multer.diskStorage({
    destination(req, file, cb) {
      const folder = 'ckeditor';
      createFolder(folder);
      const folder_name = path.join(commonContants.ckeditor_upload_path, folder);
      cb(null, folder_name);
    },
    filename(req, file, cb) {
      // console.log(req.route);
      const file_name = uuidRandom(file);
      console.log('filename', { file_name });
      cb(null, file_name);
    },
  });
};

const fileFilter = (req, file, cb) => {
  // console.log('fileFilter');
  // console.log(req.route);
  // console.log({ file });
  // api route에 따른 확장자 제한 기능
  // 업로드 실패
  // cb(null, false)

  // 업로드 성공
  cb(null, true)

  // 업로드 에러
  // cb(new Error('I don\'t have a clue!'))
};

const uuidRandom = (file): string => {
  return `${uuid()}${extname(file.originalname)}`
};

export const ckeditorMulterOptions = () => {
  const result: MulterOptions = {
    storage: storage(),
    fileFilter: fileFilter,
  }
  return result;
};