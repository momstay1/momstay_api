import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonUtils } from 'src/common/common.utils';
import { Pagination, PaginationOptions } from 'src/paginate';
import { PlaceService } from 'src/place/place.service';
import { Connection, Repository } from 'typeorm';
import { dfpConstant } from './constants';
import { CreateDefectPlaceDto } from './dto/create-defect-place.dto';
import { UpdateDefectPlaceDto } from './dto/update-defect-place.dto';
import { DefectPlaceEntity } from './entities/defect-place.entity';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DefectPlaceService {
  constructor(
    @InjectRepository(DefectPlaceEntity) private dfpRepository: Repository<DefectPlaceEntity>,
    private readonly placeService: PlaceService,
    private readonly connection: Connection
  ) { }

  getPrivateColumn(): string[] {
    return dfpConstant.privateColumn;
  }

  async create(createDefectPlaceDto: CreateDefectPlaceDto) {
    // 현장정보 가져오기
    const place = await this.placeService.findOne(Number(createDefectPlaceDto.place_idx));
    //하자현장 정보 저장
    const addPrefixdfpDto = commonUtils.addPrefix(dfpConstant.prefix, createDefectPlaceDto);
    addPrefixdfpDto.place = place;
    const dfp = await this.dfpRepository.create(addPrefixdfpDto);
    return await this.dfpRepository.save(dfp);
  }

  async findAll(place: number, options: PaginationOptions) {
    const { take, page } = options;
    const [results, total] = await this.dfpRepository.findAndCount({
      order: { dfp_sort1: 'ASC', dfp_sort2: 'ASC' },
      where: { dfp_place_idx: place },
      // relations: ['place'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('존재하지 않는 하자현장 입니다.');
    }
    const dfp = await this.dfpRepository.findOne({
      where: { dfp_idx: idx },
      relations: ['place'],
    });
    if (!dfp) {
      throw new NotFoundException('존재하지 않는 하자현장 입니다.');
    }

    return dfp;
  }

  async update(idx: number, updateDefectPlaceDto: UpdateDefectPlaceDto) {
    const addPrefixdfpDto = commonUtils.addPrefix(dfpConstant.prefix, updateDefectPlaceDto);
    addPrefixdfpDto.dfp_idx = idx;
    return await this.dfpRepository.save(addPrefixdfpDto);
  }

  remove(id: number) {
    return `This action removes a #${id} defectPlace`;
  }

  async removes(idxs: []) {
    await this.dfpRepository.createQueryBuilder()
      .delete()
      .where(" dfp_idx IN (:idxs)", { idxs: idxs })
      .execute()
  }

  async uploadExcel(idx, excel) {
    const excelInfo = excel.originalname.split(".");
    if (excelInfo[1] != 'xlsx') {
      throw new UnauthorizedException('잘못된 형식의 파일입니다.');
    }
    const workbook = XLSX.read(excel.buffer, { type: 'buffer' });

    // 첫번째 sheet의 이름을 조회
    const sheetName = workbook.SheetNames[0];
    // 첫번째 sheet를 사용
    const sheet = workbook.Sheets[sheetName];
    // sheet의 정보를 json array로 변환
    const rows = XLSX.utils.sheet_to_json(sheet, {
      defval: null, // cell에 값이 비어있으면 ''을 기본값으로 설정
    });

    await this.connection.transaction(async manager => {
      const dfpCreateDto = [];
      for (const row of rows) {
        const values = Object.keys(row).map(key => row[key]);
        dfpCreateDto.push({
          dfp_sort1: values[0],
          dfp_sort2: values[1],
          dfp_sort3: values[2],
          dfp_place_idx: idx,
          place: idx
        });
      }
      const dfp = await this.dfpRepository.create(dfpCreateDto);
      await manager.save(dfp);
      // 에러 발생시 롤백
      // throw new InternalServerErrorException();
    });

  }

  // async sampleExcel(res) {
  //   // workbook 생성
  //   const wb = XLSX.utils.book_new();
  //   // 시트 만들기
  //   const newWorksheet = XLSX.utils.json_to_sheet(dfpConstant.sampleExcel);

  //   // workbook에 새로만든 워크시트에 이름을 주고 붙임
  //   XLSX.utils.book_append_sheet(wb, newWorksheet, '하자등록샘플');

  //   // const wbOptions = { bookType: 'xlsx', type: 'base64' };
  //   // 파일을 생성(메모리에만 저장)
  //   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

  //   // 파일을 respons한다
  //   res.end(Buffer.from(wbout, 'base64'));
  // }

  // async sampleExcel1(res) {
  //   // workbook 생성
  //   const wb = XLSX.utils.book_new();
  //   // 시트 만들기
  //   const newWorksheet = XLSX.utils.json_to_sheet(dfpConstant.sampleExcel);

  //   // workbook에 새로만든 워크시트에 이름을 주고 붙임
  //   XLSX.utils.book_append_sheet(wb, newWorksheet, '하자등록샘플');

  //   // const wbOptions = { bookType: 'xlsx', type: 'binary' };

  //   const filename = '/data/sample/defect-place.xlsx';

  //   // 파일을 로컬에 생성
  //   XLSX.writeFile(wb, filename, { bookType: 'xlsx', type: 'binary' });

  //   return true;

  //   // 파일을 생성(메모리에만 저장)
  //   // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

  //   // 파일을 respons한다
  //   // res.end(Buffer.from(wbout, 'base64'));
  // }

  async sampleExcel(res) {
    const filename = 'defect-place.xlsx';
    const filepath = path.join(__dirname, '..', '..', 'data', 'sample', filename);
    res.download(filepath, filename);
  }
}
