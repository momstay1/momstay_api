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

@Controller('order')
@ApiTags('주문 API')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({
    summary: '주문 생성 API',
    description: '최초 실행시 productOptionIdx값만 입력<br>'
      + '최초 실행 이후 idx(order idx), price(가격), startAt(입주일), endAt(퇴거일), orderProductIdx값 입력<br>'
      + '주문 완료시 status: 2, imp_uid: 아임포트 고유번호 값 입력<br>'
      + '주문 상태가 0이 아니고 1이상인 주문인 경우 예외 처리<br>'
      + 'status 값이 2일때 imp_uid값 없는 경우 예외 처리<br>'
    ,
  })
  @Auth(['Any'])
  @ApiBearerAuth()
  async create(
    @GetUser() user: UsersEntity,
    @Body() createOrderDto: CreateOrderDto,
    @Req() req
  ) {
    return await this.orderService.create(user, createOrderDto, req);
  }

  // 실제 아임포트 콜백 노티 데이터 확인 후 작업
  @Post('iamport/noti')
  @ApiOperation({ summary: 'iamport 결제 후 콜백 API(작업중)' })
  async iamportNoti(@Body() iamportNoti, @Req() req) {
    console.log({ req });
    console.log({ iamportNoti });
    // return await this.orderService.create(createOrderDto, req);
  }

  @Get('guest')
  @ApiOperation({ summary: '게스트 주문 리스트 조회 API' })
  @Auth(['root', 'admin', 'guest'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: ''
      + 'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>'
      + '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>'
      + 'search=code:주문코드검생<br>'
      + 'search=imp_uid:아임포트 고유 아이디 검색<br>'
      + 'search=payment:결제방법 검색(bank, card, trans, vbank)<br>'
      + 'search=clientName:주문자명 검색<br>'
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
    return await this.orderService.guestFindAll(user, { take, page }, search, order);
  }

  @Get('host')
  @ApiOperation({ summary: '호스트 주문 리스트 조회 API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @ApiQuery({
    name: "search",
    description: ''
      + 'search=status:상태검색 (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>'
      + '7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료))<br>'
      + 'search=code:주문코드검생<br>'
      + 'search=imp_uid:아임포트 고유 아이디 검색<br>'
      + 'search=payment:결제방법 검색(bank, card, trans, vbank)<br>'
      + 'search=clientName:주문자명 검색<br>'
    // + 'search=bank:은행명 검색<br>'
    // + 'search=account:계좌번호 검색<br>'
    // + 'search=depositer:예금주명 검색<br>'
    // + 'search=remitter:입금자명 검색<br>'
    ,
    required: false
  })
  @ApiQuery({ name: "order", required: false })
  async hostFindAll(
    @GetUser() user: UsersEntity,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('search') search: string[],
    @Query('order') order: string,
  ) {
    return await this.orderService.hostFindAll(user, { take, page }, search, order);
  }

  @Get(':idx')
  @ApiOperation({ summary: '회원 주문 상세 조회 API' })
  @Auth(['Any'])
  @ApiBearerAuth()
  async findOneIdx(
    @GetUser() user: UsersEntity,
    @Param('idx') idx: string
  ) {
    return await this.orderService.findOneIdx(user, +idx);
  }

  @Get('nonmember/:code')
  @ApiOperation({ summary: '비회원 주문 상세 조회 API' })
  async findOneCode(
    @Param('code') code: string
  ) {
    return await this.orderService.findOneCode(code);
  }

  @Patch('host/:code')
  @ApiOperation({ summary: '호스트 주문 승인 API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @HttpCode(204)
  async hostOrderApproval(
    @GetUser() user: UsersEntity,
    @Param('code') code: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    await this.orderService.hostOrderApproval(code, user, updateOrderDto);
  }

  // 주문 취소 = 전체 취소만 가능
  @Delete('/guest/:code')
  @ApiOperation({ summary: '게스트 주문 취소 API' })
  @Auth(['root', 'admin', 'guest'])
  @ApiBearerAuth()
  @HttpCode(204)
  async guestOrderCancel(
    @GetUser() user: UsersEntity,
    @Param('code') code: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    await this.orderService.guestOrderCancel(code, user, updateOrderDto);
  }

  // 주문 취소 = 전체 취소만 가능
  @Delete('host/:code')
  @ApiOperation({ summary: '호스트 주문 거절 API' })
  @Auth(['root', 'admin', 'host'])
  @ApiBearerAuth()
  @HttpCode(204)
  async hostOrderCancel(
    @GetUser() user: UsersEntity,
    @Param('code') code: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    await this.orderService.hostOrderCancel(code, user, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
