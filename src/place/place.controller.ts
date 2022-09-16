import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Auth } from 'src/common/decorator/role.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { commonUtils } from 'src/common/common.utils';
import { get, map } from 'lodash';
import { PlaceEntity } from './entities/place.entity';

@Controller('place')
@ApiTags('현장 API')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  sanitizePlace(data) {
    return commonUtils.sanitizeEntity(data, this.placeService.getPrivateColumn());
  };

  // 현장 등록
  @Post()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장등록 API' })
  @ApiBody({ type: CreatePlaceDto })
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    const place = await this.placeService.create(createPlaceDto);
    return this.sanitizePlace(place);
  }

  // 현장 리스트
  @Get()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장 리스트 API' })
  async findAll(@Query('take') take: number, @Query('page') page: number) {
    const {
      results,
      total,
      pageTotal
    } = await this.placeService.findAll({ take, page });
    return {
      results: map(results, (obj) => {
        return this.sanitizePlace(obj);
      }),
      total,
      pageTotal
    };
  }

  // 현장별 하자관리 리스트
  @Get('defect')
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장별 하자관리 리스트 API' })
  async findAllDefect(@Query('take') take: number, @Query('page') page: number) {
    const {
      results,
      total,
      pageTotal
    } = await this.placeService.findAllDefect({ take, page });
    return {
      results: map(results, (obj) => {
        return this.sanitizePlace(obj);
      }),
      total,
      pageTotal
    };
  }

  // 현장 상세
  @Get(':idx')
  @Auth(['root', 'admin', 'basic'])
  @ApiOperation({ summary: '현장 정보 API' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PlaceEntity })
  async findOne(@Param('idx') idx: string) {
    const place = await this.placeService.findOne(+idx);
    const dfp = await this.placeService.getDefectPlace(get(place, ['defect_place'], {}));
    return {
      place: this.sanitizePlace(place),
      dfp: dfp
    };
  }

  // 현장 상태 일괄 변경
  @Patch()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장상태 일괄 변경 API' })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        idxs: { example: [] }
      }
    }
  })
  @HttpCode(204)
  async statusUpdate(@Body('idxs') idxs: [], @Body('status') status: string) {
    await this.placeService.statusUpdate(idxs, status);
  }

  // 현장 수정
  @Patch(':idx')
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자_현장수정 API' })
  @ApiBody({ type: CreatePlaceDto })
  async update(@Param('idx') idx: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    const place = await this.placeService.update(+idx, updatePlaceDto);
    return this.sanitizePlace(place);
  }

  // 현장 삭제
  @Delete()
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOperation({ summary: '현장삭제 API' })
  @HttpCode(204)
  @ApiBody({
    schema: {
      properties: {
        idxs: { example: [] }
      }
    }
  })
  async remove(@Body('idxs') idxs: []) {
    await this.placeService.removes(idxs);
  }
}
