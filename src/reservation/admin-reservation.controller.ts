import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';
import { createReadStream } from 'fs';

@Controller('admin/reservation')
@ApiTags('방문 예약(관리자) API')
export class AdminReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // @Post()
  // @ApiOperation({
  //   summary: '방문 예약 등록 API',
  //   description: '상태값 (1:대기, 2:승인, 4:취소(게스트), 5:거절(호스트))'
  // })
  // @Auth(['root', 'admin', 'host', 'guest'])
  // @ApiBearerAuth()
  // async create(
  //   @GetUser() user: UsersEntity,
  //   @Body() createReservationDto: CreateReservationDto
  // ) {
  //   return await this.reservationService.create(user, createReservationDto);
  // }

  @Get()
  @ApiOperation({ summary: '방문 예약 리스트 (관리자) API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description:
      'search=status:1,2,4,5<br>방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)<br>' +
      'search=po_title:방 이름<br>' +
      'search=name:예약자명<br>' +
      'search=email:예약자 이메일<br>' +
      'search=id:예약자 아이디<br>' +
      'search=min_visit_date:예약일<br>' +
      'search=max_visit_date:예약일<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
  })
  async findAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
  ) {
    const { data, file_info } = await this.reservationService.findAll(
      user,
      { take, page },
      search,
      order,
    );
    return {
      ...data,
      file_info,
    };
  }

  // @Get('/guest')
  // @ApiOperation({ summary: '방문 예약 리스트 (게스트) API' })
  // @Auth(['Any'])
  // @ApiBearerAuth()
  // async guestFindAll(
  //   @GetUser() user: UsersEntity,
  //   @Query('take') take: number,
  //   @Query('page') page: number,
  // ) {
  //   const {
  //     data,
  //     file_info
  //   } = await this.reservationService.guestFindAll({ take, page }, user);
  //   return {
  //     ...data,
  //     file_info
  //   };
  // }

  // @Get(':idx')
  // @ApiOperation({ summary: '방문 예약 상세 API' })
  // @Auth(['Any'])
  // @ApiBearerAuth()
  // async findOne(@Param('idx') idx: string) {
  //   return await this.reservationService.findOne(+idx);
  // }

  @Patch()
  @ApiOperation({
    summary: '방문 예약 상태 변경(관리자) API',
    description:
      'status: 상태값<br>idxs: 방문예약 idx 배열<br>' +
      '방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)',
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        idxs: { example: [] },
      },
    },
  })
  async adminStatusChange(
    @Body('status') status: string,
    @Body('idxs') idxs: number[],
  ) {
    return await this.reservationService.adminChangeStatus(+status, idxs);
  }

  // @Delete('guest/:idx')
  // @ApiOperation({ summary: '방문 예약 취소(게스트) API' })
  // @Auth(['Any'])
  // @ApiBearerAuth()
  // async guestCancel(
  //   @GetUser() user: UsersEntity,
  //   @Param('idx') idx: string
  // ) {
  //   return await this.reservationService.guestCancel(user, +idx);
  // }
  // @Delete('host/:idx')
  // @ApiOperation({ summary: '방문 예약 거절(호스트) API' })
  // @Auth(['root', 'admin', 'host'])
  // @ApiBearerAuth()
  // async hostCancel(
  //   @GetUser() user: UsersEntity,
  //   @Param('idx') idx: string
  // ) {
  //   return await this.reservationService.hostCancel(user, +idx);
  // }

  @Get('excel')
  @ApiOperation({ summary: '방문 예약 리스트 (관리자) 엑셀 다운로드 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search',
    description:
      'search=status:1,2,4,5<br>방문예약 상태 (1: 예약대기, 2: 예약승인, 3: 예약확정, 4: 예약취소, 5: 예약거부)<br>' +
      'search=po_title:방 이름<br>' +
      'search=name:예약자명<br>' +
      'search=email:예약지 이메일<br>' +
      'search=min_visit_date:예약일<br>' +
      'search=max_visit_date:예약일<br>',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'order=createdAt:(ASC:오래된순|DESC:최신순, 기본값:DESC)<br>',
    required: false,
  })
  async excelDownload(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
    @Res() res,
  ) {
    // 엑셀 생성
    const excel_file = await this.reservationService.createExcel(
      user,
      { take, page },
      search,
      order,
    );
    // 엑셀 다운로드
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition':
        'attachment; filename="' + excel_file.file_name + '"',
    });
    createReadStream(excel_file.file_path).pipe(res);
  }
}
