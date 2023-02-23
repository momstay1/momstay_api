import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('reservation')
@ApiTags('방문 예약 API')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @ApiOperation({
    summary: '방문 예약 등록 API',
    description: '상태값 (1:대기, 2:승인, 4:취소(게스트), 5:거절(호스트))'
  })
  @Auth(['root', 'admin', 'guest'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createReservationDto: CreateReservationDto
  ) {
    return await this.reservationService.create(user, createReservationDto);
  }

  @Get('/host')
  @ApiOperation({ summary: '방문 예약 리스트 (호스트) API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  async hostFindAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    const {
      data: {
        results,
        total,
        pageTotal
      },
      file_info
    } = await this.reservationService.hostFindAll({ take, page }, user);
    return {
      results,
      total,
      pageTotal,
      file_info
    };
  }

  @Get('/guest')
  @ApiOperation({ summary: '방문 예약 리스트 (게스트) API' })
  @Auth(['root', 'admin', 'guest'])
  @ApiBearerAuth()
  async guestFindAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
  ) {
    const {
      data: {
        results,
        total,
        pageTotal
      },
      file_info
    } = await this.reservationService.guestFindAll({ take, page }, user);
    return {
      results,
      total,
      pageTotal,
      file_info
    };
  }

  @Get(':idx')
  @ApiOperation({ summary: '방문 예약 상세 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async findOne(@Param('idx') idx: string) {
    return await this.reservationService.findOne(+idx);
  }

  @Patch(':idx')
  @ApiOperation({ summary: '방문 예약 승인(호스트) API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  async update(
    @GetUser() user: UsersEntity,
    @Param('idx') idx: string,
  ) {
    return await this.reservationService.update(user, +idx);
  }

  @Delete('guest/:idx')
  @ApiOperation({ summary: '방문 예약 취소(게스트) API' })
  @Auth(['root', 'admin', 'guest'])
  @ApiBearerAuth()
  async guestCancel(
    @GetUser() user: UsersEntity,
    @Param('idx') idx: string
  ) {
    return await this.reservationService.guestCancel(user, +idx);
  }
  @Delete('host/:idx')
  @ApiOperation({ summary: '방문 예약 거절(호스트) API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  async hostCancel(
    @GetUser() user: UsersEntity,
    @Param('idx') idx: string
  ) {
    return await this.reservationService.hostCancel(user, +idx);
  }
}
