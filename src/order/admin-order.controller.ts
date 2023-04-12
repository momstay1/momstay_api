import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/role.decorator';
import { GetUser } from 'src/auth/getuser.decorator';
import { UsersEntity } from 'src/users/entities/user.entity';

@Controller('admin/order')
@ApiTags('주문(관리자) API')
export class AdminOrderController {
  constructor(private readonly orderService: OrderService) { }

  // @Get('test')
  // @ApiOperation({ summary: '테스트' })
  // async test(
  //   @Query('order_idx') order_idx: string,
  //   @Query('price') price: string,
  // ) {
  //   // await this.orderService.test(order_idx, price);
  //   // return await this.orderService.create(createOrderDto, req);
  // }

  @Get()
  @ApiOperation({
    summary: '게스트 주문 리스트 조회 API',
    description: '관리자 계정 로그인 상태에서 리스트 조회시 다른 사람의 주문 내역 확인 가능<br>'
      + '호스트, 게스트 계정 로그인 상태에서 리스트 조회시 자신의 주문 내역만 확인 가능<br>'
    ,
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: ''
      + 'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>'
      + '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>'
      + 'search=code:주문코드검생<br>'
      + 'search=imp_uid:아임포트 고유 아이디 검색<br>'
      + 'search=payment:결제방법 검색(bank, card, trans, vbank)<br>'
      + 'search=productTitle:방 이름 검색<br>'
      + 'search=clientName:주문자명 검색<br>'
      + 'search=clientId:주문자아이디 검색<br>'
      + 'search=min_paiedAt:최소 결제일<br>'
      + 'search=max_paiedAt:최대 결제일<br>'
    // + 'search=bank:은행명 검색<br>'
    // + 'search=account:계좌번호 검색<br>'
    // + 'search=depositer:예금주명 검색<br>'
    // + 'search=remitter:입금자명 검색<br>'
    ,
    required: false
  })
  @ApiQuery({ name: "order", required: false })
  async guestFindAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
  ) {
    return await this.orderService.adminFindAll(user, { take, page }, search, order);
  }


  @Get(':idx')
  @ApiOperation({
    summary: '주문 상세 조회 API',
  })
  @Auth(['root', 'admin'])
  @ApiBearerAuth()
  async findOneIdxByAdmin(
    @Param('idx') idx: string
  ) {
    return await this.orderService.findOneIdxByAdmin(+idx);
  }
}
