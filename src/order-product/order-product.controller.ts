import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) { }

  @Post()
  create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductService.create(createOrderProductDto);
  }

  @Get()
  findAll() {
    return this.orderProductService.findAll();
  }

  @Get('calc-price/:price/:start/:end')
  @ApiOperation({ summary: '가격 계산' })
  async calcPrice(@Param('price') price: string, @Param('start') start: string, @Param('end') end: string) {
    return await this.orderProductService.calcTotalPrice(+price, start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderProductDto: UpdateOrderProductDto) {
    return this.orderProductService.update(+id, updateOrderProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderProductService.remove(+id);
  }
}
