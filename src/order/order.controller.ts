import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('주문 API')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({ summary: '주문 생성 API' })
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return await this.orderService.create(createOrderDto, req);
  }

  // 실제 아임포트 콜백 노티 데이터 확인 후 작업
  @Post('iamport/noti')
  @ApiOperation({ summary: 'iamport 결제 후 콜백 API(작업중)' })
  async iamportNoti(@Body() iamportNoti, @Req() req) {
    console.log({req});
    console.log({iamportNoti});
    // return await this.orderService.create(createOrderDto, req);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
