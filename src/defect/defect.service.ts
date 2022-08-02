import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get, isArray, map } from 'lodash';
import { AlignmentOptions } from 'src/alignment';
import { commonUtils } from 'src/common/common.utils';
import { FileService } from 'src/file/file.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { dftConstant } from './constants';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';
import { DefectEntity } from './entities/defect.entity';
import * as XLSX from 'xlsx';
import * as path from 'path';
import { PlaceService } from 'src/place/place.service';
import { commonContants } from 'src/common/common.constants';
import * as moment from 'moment';

@Injectable()
export class DefectService {
  constructor(
    @InjectRepository(DefectEntity) private defectRepository: Repository<DefectEntity>,
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
    @Inject(forwardRef(() => PlaceService))
    private readonly placeService: PlaceService,
  ) { }

  getPrivateColumn(): string[] {
    const userPrivateColumn = this.usersService.getPrivateColumn();
    return [
      ...dftConstant.privateColumn,
      ...userPrivateColumn
    ];
  }

  async create(user, createDefectDto: CreateDefectDto, files) {
    const addPrefixcreateDefectDto = commonUtils.addPrefix(dftConstant.prefix, createDefectDto);
    addPrefixcreateDefectDto.place = addPrefixcreateDefectDto.dft_place_idx;
    addPrefixcreateDefectDto.user = await this.usersService.findOne(user.user_id);

    const dft = await this.defectRepository.create({ ...addPrefixcreateDefectDto });
    await this.defectRepository.save(dft);
    const file_info = await this.fileService.fileInfoInsert(files, dft['dft_idx']);
    return { dft, file_info };
  }

  async findAll(
    place: number,
    options: PaginationOptions,
    alignment: AlignmentOptions,
    search: string[]
  ) {
    // 페이지 네이션
    const { take, page } = options;

    // 정렬 설정
    const order = {};
    if (alignment['order'] && alignment['sort']) {
      if (alignment['order'] == 'filename') {
        for (let i = 1; i <= 3; i++) {
          order[dftConstant.prefix + '_sort' + i] = alignment['sort'].toUpperCase();
        }
      } else {
        order[dftConstant.prefix + '_' + alignment['order']] = alignment['sort'].toUpperCase();
      }
    }
    order['dft_createdAt'] = 'DESC';

    // 조건 설정
    const where = {};
    if (search) {
      search = isArray(search) ? search : [search];
      map(search, (obj) => {
        if (obj) {
          const key_val = obj.split(':');
          where[key_val[0]] = key_val[1];
        }
      });
    }

    const [results, total] = await this.defectRepository.findAndCount({
      order: order,
      where: (qb) => {
        qb.where('dft_place_idx = :dft_place_idx', { dft_place_idx: place });
        get(where, 'sort1', '') && qb.andWhere('dft_sort1 = :dft_sort1', { dft_sort1: get(where, 'sort1') });
        get(where, 'sort2', '') && qb.andWhere('dft_sort2 = :dft_sort2', { dft_sort2: get(where, 'sort2') });
        get(where, 'sort3', '') && qb.andWhere('dft_sort3 = :dft_sort3', { dft_sort3: get(where, 'sort3') });
        get(where, 'status', '') && qb.andWhere('dft_status = :dft_status', { dft_status: get(where, 'status') });
        get(where, 'type', '') && qb.andWhere('dft_type = :dft_type', { dft_type: get(where, 'type') });
        get(where, 'shooting_day_lte', '') && qb.andWhere('dft_shooting_day <= :dft_shooting_day_lte', { dft_shooting_day_lte: get(where, 'shooting_day_lte') });
        get(where, 'shooting_day_mte', '') && qb.andWhere('dft_shooting_day >= :dft_shooting_day_mte', { dft_shooting_day_mte: get(where, 'shooting_day_mte') });
        get(where, 'name', '') && qb.andWhere('user_name = :user_name', { user_name: get(where, 'name') });
      },
      relations: ['user'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findAllPlaceCount(place_idx: Array<Number>) {
    const defect = await this.defectRepository.createQueryBuilder()
      .select('COUNT(dft_place_idx)', 'defect_cnt')
      .addSelect('dft_place_idx')
      .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
      .orderBy('dft_createdAt', 'DESC')
      .groupBy('dft_place_idx')
      .getRawMany()

    return defect;
  }

  async findAllPlaceIdxs(place_idx: Array<Number>) {
    const defects = await this.defectRepository.createQueryBuilder()
      .select('*')
      .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
      .orderBy('dft_createdAt', 'DESC')
      .getRawMany()
    const dft_idxs = map(defects, (o) => {
      return o.dft_idx;
    });
    return dft_idxs;
  }

  async findAllPlace(place_idx) {
    return await this.defectRepository.createQueryBuilder()
      .select('*')
      .where('dft_place_idx IN (:place_idx)', { place_idx: place_idx })
      .orderBy('dft_createdAt', 'DESC')
      .getRawMany();
  }

  async excel(place_idx) {
    const defect = await this.findAllPlace(place_idx);
    const place = await this.placeService.findOne(place_idx);

    const array_data = [
      [
        '동',
        '호수',
        '위치',
        '작업상태',
        '하자유형',
        '내용',
        '작업방법',
        '교체면적(m2)',
        '교체면적(장)',
        // '파일명', 
        '등록일'
      ]
    ];
    for (const key in defect) {
      array_data.push([
        get(defect[key], 'dft_sort1', ''),                              // 동
        get(defect[key], 'dft_sort2', ''),                              // 호수
        get(defect[key], 'dft_sort3', ''),                              // 위치
        get(dftConstant.status, defect[key].dft_status, ''),            // 작업상태
        get(dftConstant.type, defect[key].dft_type, ''),                // 하자유형
        get(defect[key], 'dft_content', ''),                            // 내용
        get(dftConstant.work_method, defect[key].dft_work_method, ''),  // 작업방법
        get(defect[key], 'dft_replacement_square_meter', ''),           // 교체면적(m2)
        get(defect[key], 'dft_replacement_sheet', ''),                  // 교체면적(장)
        // '',                                                          // 파일명
        moment(defect[key].dft_createdAt).format('YYYY-MM-DD hh:mm:ss'),// 등록일
      ]);
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(array_data);
    worksheet['!cols'] = [
      { wpx: 45 }, // 동
      { wpx: 45 }, // 호수
      { wpx: 45 }, // 위치
      { wpx: 70 }, // 작업상태
      { wpx: 50 }, // 하자유형
      { wpx: 400 }, // 내용
      { wpx: 70 }, // 작업방법
      { wpx: 70 }, // 교체면적(m2)
      { wpx: 70 }, // 교체면적(장)
      // { wpx: 200 }, // 파일명
      { wpx: 120 }, // 등록일
    ];

    const file_name = 'defect_excel.xlsx';
    const file_path = path.join(commonContants.defect_excel_path, file_name);
    console.log({ file_name });
    console.log({ file_path });

    XLSX.utils.book_append_sheet(workbook, worksheet, place.place_name);
    XLSX.writeFile(workbook, file_path);

    return { file_name: file_name, file_path: file_path };
  }

  findOne(id: number) {
    return `This action returns a #${id} defect`;
  }

  update(id: number, updateDefectDto: UpdateDefectDto) {
    return `This action updates a #${id} defect`;
  }

  remove(id: number) {
    return `This action removes a #${id} defect`;
  }
}
