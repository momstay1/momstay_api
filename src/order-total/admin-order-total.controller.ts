import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTotalService } from './order-total.service';
import { CreateOrderTotalDto } from './dto/create-order-total.dto';
import { UpdateOrderTotalDto } from './dto/update-order-total.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';

@Controller('admin/order-total')
@ApiTags('총주문 (관리자) API')
export class AdminOrderTotalController {
  constructor(private readonly orderTotalService: OrderTotalService) { }

  @Get('sales_statistics/year/')
  @ApiOperation({ summary: '관리자_연도별 매출 통계 API' })
  // @Auth(['root', 'admin'])
  // @ApiBearerAuth()
  async salesStatisticsYear() {
    return await this.orderTotalService.salesStatisticsYear();
  }

  @Get('sales_statistics/month/:year')
  @ApiOperation({ summary: '관리자_월별 매출 통계 API' })
  // @Auth(['root', 'admin'])
  // @ApiBearerAuth()
  @ApiParam({
    name: 'year',
    description: '검색할 년도',
  })
  async salesStatisticsMonth(@Param('year') year: string) {
    return await this.orderTotalService.salesStatisticsMonth(year);
  }

  @Get('sales_statistics/day/:yearMonth')
  @ApiOperation({ summary: '관리자_일별 매출 통계 API' })
  // @Auth(['root', 'admin'])
  // @ApiBearerAuth()
  @ApiParam({
    name: 'yearMonth',
    description: '검색할 년월',
  })
  async salesStatisticsDay(@Param('yearMonth') yearMonth: string) {
    return await this.orderTotalService.salesStatisticsDay(yearMonth);
  }
}
