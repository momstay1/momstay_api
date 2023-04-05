import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminUsersEntity } from 'src/admin-users/entities/admin-user.entity';
import { GetUser } from 'src/auth/getuser.decorator';
import { Auth } from 'src/common/decorator/role.decorator';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
@ApiTags('대시보드(관리자) API')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  // @Post()
  // create(@Body() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @Get()
  // findAll() {
  //   return this.dashboardService.findAll();
  // }

  // 관리자 대시보드 회원 정보
  @Get('users')
  @ApiOperation({ summary: '관리자_대시보드 회원 정보 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'total_cnt: 총 회원 수(게스트, 호스트 회원만 인원수 체크)<br>'
      + 'guest_cnt: 게스트 회원 수<br>'
      + 'host_cnt: 호스트 회원 수<br>'
      + 'dormant_cnt: 휴면 회원 수<br>'
      + 'new_cnt: 가입 날짜가 오늘인 회원 수<br>'
      + 'new_host_cnt: 호스트로 변경한 날짜가 오늘인 호스트 회원 수<br>'
      + 'new_leave_cnt: 오늘 날짜로 탈퇴한 회원 수<br>'
    ,
    schema: {
      example: {
        total_cnt: 'number',
        guest_cnt: 'number',
        host_cnt: 'number',
        dormant_cnt: 'number',
        new_cnt: 'number',
        new_host_cnt: 'number',
        new_leave_cnt: 'number',
      }
    }
  })
  async getUsersDashboard() {
    return await this.dashboardService.getUsersDashboard();
  }

  // 관리자 대시보드 호스트 멤버십 숙소 정보
  @Get('product')
  @ApiOperation({ summary: '관리자_대시보드 호스트 멤버십 정보 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'total_cnt: 총 멤버십 숙소 개수 (사용중인 상태 숙소만 반영)<br>'
    ,
    schema: {
      example: {
        total_cnt: 'number',
      }
    }
  })
  async getProductDashboard() {
    return await this.dashboardService.getProductDashboard();
  }

  // 관리자 대시보드 게스트 주문 현황 정보
  @Get('order')
  @ApiOperation({ summary: '관리자_대시보드 게스트 주문 현황 정보 API' })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'order_cnt.payment_cnt: 이번달 결제 상태 주문 개수 <br>'
      + 'order_cnt.cancel_cnt: 이번달 취소완료 상태 주문 개수 <br>'
      + 'order_cnt.confirmed_cnt: 이번달 주문확정 상태 주문 개수 <br>'
      + 'order_total_price.total_pay_price: 이번달 결제완료, 배송중(호스트 승인), 주문확정 상태의 총 가격 <br>'
      + 'reservation.total_cnt: 이번달 방문예약 신청 개수 <br>'
    ,
    schema: {
      example: {
        total_cnt: 'number',
      }
    }
  })
  async getOrderDashboard() {
    return await this.dashboardService.getOrderDashboard();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}
