import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @UseInterceptors(FilesInterceptor('image', 10, multerOptions()))
  @Post('upload')
  async uploadImg(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.uploadImg(files);
    // return this.fileService.create(createFileDto);
  }

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'dft_origin_img', maxCount: 10 },
    { name: 'dft_info_img', maxCount: 10 },
  ], multerOptions()))
  @Post('upload1')
  async uploadImg1(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log({ files });
    console.log(files['dft_origin_img']);
    console.log(files['dft_info_img']);
    return true;
    // return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
