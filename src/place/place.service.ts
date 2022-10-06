import { Injectable, NotAcceptableException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _, { filter, get, keyBy, map, mapValues, uniq } from 'lodash';
import { commonUtils } from 'src/common/common.utils';
import { DefectPlaceEntity } from 'src/defect-place/entities/defect-place.entity';
import { DefectService } from 'src/defect/defect.service';
import { Pagination, PaginationOptions } from 'src/paginate';
import { In, Repository } from 'typeorm';
import { placeConstant } from './constants';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepository: Repository<PlaceEntity>,
    private readonly defectService: DefectService,
  ) { }

  getPrivateColumn(): string[] {
    return placeConstant.privateColumn;
  }

  async create(createPlaceDto: CreatePlaceDto) {
    const place = await this.checkPlaceExists(createPlaceDto.name);
    if (place && place.place_status != placeConstant.status.delete) {
      throw new UnprocessableEntityException('현장 이름이 중복 됩니다.');
    }
    //현장 정보 저장
    return await this.savePlace(createPlaceDto);;
  }

  async findAll(options: PaginationOptions) {
    const exception_status = [placeConstant.status.delete];
    const status_arr = await this.getStatus(exception_status);

    const { take, page } = options;
    const [results, total] = await this.placeRepository.findAndCount({
      order: { place_createdAt: 'DESC' },
      where: { place_status: In(status_arr) },
      // relations: ['user_group'],
      take: take,
      skip: take * (page - 1)
    });
    return new Pagination({
      results,
      total,
    })
  }

  async findAllDefect(options: PaginationOptions) {
    // 현장 목록 가져오기
    const places = await this.findAll(options);

    // 현장 idx 추출
    const place_idxs = map(places.results, (obj) => {
      return obj.place_idx;
    });

    // 현장별 하자건수 가져오기
    const dft_place_cnt = keyBy(
      await this.defectService.findAllPlaceCount(place_idxs),
      (o) => {
        return o.dft_place_idx;
      }
    );
    console.log({ dft_place_cnt });
    places.results = map(places.results, (obj) => {
      obj['place_defect_cnt'] = get(dft_place_cnt, [obj.place_idx, 'defect_cnt'], 0);
      return obj;
    });

    return places;
  }

  async findOne(idx: number) {
    if (!idx) {
      throw new NotFoundException('존재하지 않는 현장 입니다.');
    }
    const place = await this.placeRepository.findOne({
      where: { place_idx: idx },
      relations: ['defect_place'],
    });
    if (!place) {
      throw new NotFoundException('존재하지 않는 현장 입니다.');
    }

    const dftp = {};
    if (get(place, 'defect_place')) {
      const dfp = get(place, ['defect_place'], []);
      for (const object of dfp) {
        const sort1 = object.dfp_sort1.replace(/[^0-9]/g, "");
        if (!get(dftp, [sort1], '')) {
          dftp[sort1] = {};
        }
        dftp[sort1][object.dfp_idx] = { sort2: object.dfp_sort2, sort3: object.dfp_sort3 };
      }
    }
    return place;
  }

  async getDefectPlace(defect_place) {
    const dftp = {};
    if (defect_place) {
      const dfp = defect_place;
      for (const object of dfp) {
        const sort1 = object.dfp_sort1.replace(/[^0-9]/g, "");
        if (!get(dftp, [sort1], '')) {
          dftp[sort1] = {};
        }
        dftp[sort1][object.dfp_idx] = { sort2: object.dfp_sort2, sort3: object.dfp_sort3 };
      }
    }

    return dftp;
  }

  async update(idx: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.findOne(idx);
    const existPlace = await this.checkPlaceExists(updatePlaceDto.name);
    if (existPlace) {
      throw new NotAcceptableException('중복된 현장명이 존재합니다.');
    }

    place.place_status = Number(updatePlaceDto.status);
    place.place_name = updatePlaceDto.name;
    place.place_addr = updatePlaceDto.addr;
    place.place_memo = updatePlaceDto.memo;

    return await this.placeRepository.save(place);
  }

  async remove(idx: number) {
    const place = await this.findOne(idx);
    place.place_status = placeConstant.status.delete;
    await this.placeRepository.save(place);
  }

  async removes(idxs: []) {
    if (idxs.length <= 0) {
      throw new NotFoundException('삭제할 정보가 없습니다.');
    }
    await this.placeRepository.createQueryBuilder()
      .update(PlaceEntity)
      .set({ place_status: placeConstant.status.delete })
      .where(" place_idx IN (:idxs)", { idxs: idxs })
      .execute()
    // for (const key in idxs) {
    //   this.remove(idxs[key]);
    // }
  }

  async statusUpdate(idxs: [], status: string) {
    await this.placeRepository.createQueryBuilder()
      .update(PlaceEntity)
      .set({ place_status: Number(status) })
      .where(" place_idx IN (:idxs)", { idxs: idxs })
      .execute()
  }

  //현장 존재 여부 체크
  private async checkPlaceExists(name: string) {
    return await this.placeRepository.findOne({ place_name: name });
  }

  //현장 정보 저장
  private async savePlace(createPlaceDto): Promise<any> {
    const addPrefixPlaceDto = commonUtils.addPrefix(placeConstant.prefix, createPlaceDto);
    addPrefixPlaceDto.place_status
      = get(addPrefixPlaceDto, 'place_status')
        ? get(addPrefixPlaceDto, 'place_status')
        : placeConstant.default.status;
    addPrefixPlaceDto.place_type
      = get(addPrefixPlaceDto, 'place_type')
        ? get(addPrefixPlaceDto, 'place_type')
        : placeConstant.default.type;
    const place = await this.placeRepository.create({ ...addPrefixPlaceDto });
    return await this.placeRepository.save(place);
  }

  private async getStatus(exceptionStatus: Array<Number>) {
    const status_arr: number[] = [];
    for (const key in placeConstant.status) {
      if (!exceptionStatus.includes(placeConstant.status[key])) {
        status_arr.push(placeConstant.status[key]);
      }
    }

    return status_arr;
  }
}
