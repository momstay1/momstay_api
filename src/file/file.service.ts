import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnsupportedMediaTypeException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import { In, Like, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';
import { commonContants } from 'src/common/common.constants';
// import { DefectService } from 'src/defect/defect.service';
import * as path from 'path';
import * as zl from 'zip-lib';

const img_url = '/file/img/';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>,
    // @Inject(forwardRef(() => DefectService))
    // private readonly defectService: DefectService,
  ) { }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async uploadImg(files: Express.Multer.File[]) {
    console.log({ files });
  }

  async ckeditorUploadImg(file: Express.Multer.File) {
    const file_info = await this.fileInfoInsert({ ckeditor: file }, 0);
    return file_info[0].ckeditor;
  }

  findAll() {
    return `This action returns all file`;
  }

  async findOneName(name: string) {
    // return `This action returns a #${id} file`;
    const file = await this.fileRepository.findOne({
      where: {
        file_raw_name: name
      }
    });
    if (!file) {
      throw new NotFoundException('존재하지 않는 파일 입니다.');
    }
    if (file.file_is_img == '0') {
      throw new UnsupportedMediaTypeException('이미지 파일이 아닙니다.');
    }
    return file;
  }

  async findOne(category: string, idx: string) {
    const files = await this.fileRepository.find({
      where: {
        file_category: Like('%' + category + '%'),
        file_foreign_idx: idx
      }
    });
    if (files.length <= 0) {
      throw new NotFoundException('존재하지 않는 파일 입니다.');
    }
    return keyBy(files, (o) => o.file_category);
  }

  async findIndexs(idxs: string[]) {
    const files = await this.fileRepository.find({
      where: {
        file_foreign_idx: In(idxs),
        file_category: In(['dft_origin_img', 'dft_info_img'])
      }
    });
    if (files.length <= 0) {
      throw new NotFoundException('존재하지 않는 파일 입니다.');
    }

    return this.imageZip(files, 'selectImage');
  }

  async findCategory(category: string[], foreign_idx: string) {
    const files = await this.fileRepository.find({
      where: {
        file_category: In(category),
        file_foreign_idx: foreign_idx
      }
    });

    const result = {};
    result[foreign_idx] = keyBy(files, (o) => {
      return o.file_category;
    });

    return result;
  }

  async findAllPlace(type: string, place_idx: number) {
    // const dft_idxs = await this.defectService.findAllPlaceIdxs([+place_idx]);

    // const file_category = [];
    // if (type == 'all') {
    //   file_category.push('dft_origin_img', 'dft_info_img');
    // } else {
    //   file_category.push('dft_' + type + '_img');
    // }
    // const files = await this.fileRepository.find({
    //   where: {
    //     file_category: In(file_category),
    //     file_foreign_idx: In(dft_idxs),
    //   }
    // });

    // return this.imageZip(files, type);
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  async fileInfoInsert(files, foreign_idx) {
    const files_data = [];
    let order = 1;
    const base_order = 10;
    const file_category = [];

    // DB에 저장할 파일 정보 설정
    for (const i in files) {
      file_category.push(i); // 저장 후 조회할 파일 카테고리 정보
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

    // 파일정보 저장
    await this.fileRepository
      .createQueryBuilder()
      .insert()
      .values(files_data)
      .execute();

    // 저장한 파일 조회 및 반환
    return await this.findCategory(file_category, foreign_idx);
  }

  isImage(type) {
    const png_mimes = ['image/x-png'];
    const jpeg_mimes = ['image/jpg', 'image/jpe', 'image/jpeg', 'image/pjpeg'];
    if (png_mimes.includes(type)) {
      type = 'image/png';
    } else if (jpeg_mimes.includes(type)) {
      type = 'image/jpeg';
    }

    const img_mimes = ['image/gif', 'image/jpeg', 'image/png'];
    return img_mimes.includes(type) ? 1 : 0;
  }

  private async imageZip(files, type) {
    const zip = new zl.Zip();
    for (const key in files) {
      // 이미지 압축시 암호화된 파일명 origin 이름으로 수정 후 새파일 생성 후 압축
      const change_file_name = path.join(files[key].file_path, files[key].file_name);
      let file_name = files[key].file_orig_name;

      if (files[key].file_category != 'dft_origin_img' && files[key].file_orig_name.indexOf('정보표시') == -1) {
        const temp_file_name = files[key].file_orig_name.split('.');
        file_name = temp_file_name[0] + '_정보표시.' + temp_file_name[1];
      }

      zip.addFile(change_file_name, file_name);
    }
    const zip_file_name = `${type}.zip`;
    const zip_file_path = path.join(commonContants.zip_upload_path, zip_file_name);
    await zip.archive(zip_file_path);

    return { file_name: zip_file_name, file_path: zip_file_path };
  }

}
