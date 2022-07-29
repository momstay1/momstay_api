import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { keyBy } from 'lodash';
import * as path from 'path';
import { In, Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>,
  ) { }

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async uploadImg(files: Express.Multer.File[]) {
    console.log({ files });
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
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
        files_data.push({
          file_category: i,
          file_foreign_idx: foreign_idx,
          file_name: files[i][j].filename,
          file_type: files[i][j].mimetype,
          file_path: files[i][j].destination,
          file_full_path: files[i][j].path,
          file_html_path: '',
          file_html_pull_path: '',
          file_html_thumb_path: '',
          file_raw_name: files[i][j].filename.split('.')[0],
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
}
