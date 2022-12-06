import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/common.file';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { ckeditorMulterOptions } from 'src/common/common.ckeditor';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) { }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @UseInterceptors(FilesInterceptor('ckeditor', 10, ckeditorMulterOptions()))
  @Post('ckeditor/upload')
  async ckeditorUploadImg(@UploadedFiles() file: Express.Multer.File) {
    return await this.fileService.ckeditorUploadImg(file);
  }

  // @Get('ckeditor/img/:name')
  // @ApiOperation({ summary: '이미지 파일 API' })
  // async getCkeditorFile(@Param('name') name: string, @Res() res) {
  //   // const file = await this.fileService.findOneName(name);
  //   console.log(path.join(commonContants.ckeditor_upload_path, 'ckeditor', name));
  //   return res.sendFile(path.join(commonContants.ckeditor_upload_path, 'ckeditor', name));
  // }

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

  @Get('img/:name')
  @ApiOperation({ summary: '이미지 파일 API' })
  async getFile(@Param('name') name: string, @Res() res) {
    const file = await this.fileService.findOneName(name);
    return res.sendFile(file.file_full_path);
  }

  @Get('download/:name')
  @ApiOperation({ summary: '이미지 파일 다운로드 API' })
  async downloadFile(@Param('name') name: string, @Res() res) {
    console.log({ name });
    const file = await this.fileService.findOneName(name);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + encodeURI(file.file_orig_name) + '"',
    });
    createReadStream(file.file_full_path).pipe(res);
  }

  @Get('downloads/select')
  @ApiOperation({ summary: '선택 이미지 파일 다운로드 API' })
  async selectDownloadFile(@Query('file') file: string, @Res() res) {
    const files = await this.fileService.findIndexs(file.split(','));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="' + encodeURI(files.file_name) + '"',
    });
    createReadStream(files.file_path).pipe(res);
  }

  @Get('downloads/:type/:place_idx')
  @ApiOperation({ summary: '현장이미지 파일 전체 다운로드 API' })
  @ApiParam({
    name: 'type',
    description: 'all(전체)|origin(원본)|info(정보표시된)',
  })
  async downloadsFile(@Param('type') type: string, @Param('place_idx') place_idx: string, @Res() res) {
    // const dft_idxs = await this.defectService.findAllPlaceIdxs([+place_idx]);
    // const zip = await this.fileService.findAllPlace(type, +place_idx);
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="' + zip.file_name + '"',
    // });
    // createReadStream(zip.file_path).pipe(res);
  }

  @Get(':category/:idx')
  @ApiOperation({ summary: '파일 정보 API' })
  async getFileInfo(
    @Param('category') category: string,
    @Param('idx') idx: string
  ) {
    return await this.fileService.findOne(category, idx);
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
