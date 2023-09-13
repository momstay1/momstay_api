import { Controller } from '@nestjs/common';
import { OrderTotalService } from './order-total.service';

@Controller('order-total')
export class OrderTotalController {
  constructor(private readonly orderTotalService: OrderTotalService) { }

  // @Post()
  // create(@Body() createOrderTotalDto: CreateOrderTotalDto) {
  //   return this.orderTotalService.create(createOrderTotalDto);
  // }

  // @Get()
  // findAll() {
  //   return this.orderTotalService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderTotalService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderTotalDto: UpdateOrderTotalDto) {
  //   return this.orderTotalService.update(+id, updateOrderTotalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderTotalService.remove(+id);
  // }
}
