import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateOrderDto {

  @IsOptional()
  @ApiProperty({ description: '주문 idx', required: false })
  idx: number;
  @IsOptional()
  @ApiProperty({
    description: `상태<br>
    (1:결제대기, 2:결제완료, 3:배송준비, 4:배송중(호스트 승인), 6:구매확정,<br>
    7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료)`, required: false
  })
  status: number;
  @IsOptional()
  @ApiProperty({ description: '아임포트 uid', required: false })
  readonly imp_uid: string;
  @IsOptional()
  @ApiProperty({ description: '인앱결제 빌링키(사용X)', required: false })
  readonly billingKey: string;
  @IsOptional()
  @ApiProperty({ description: '결제 방법(bank, card, trans, vbank)', required: false })
  readonly payment: string;
  @IsOptional()
  @ApiProperty({ description: '결제 금액', required: false })
  readonly price: number;
  @IsOptional()
  @ApiProperty({ description: '구매 상품 개수', required: false })
  readonly num: number;
  @IsOptional()
  @ApiProperty({ description: '입주일', required: false })
  readonly startAt: string | Date;
  @IsOptional()
  @ApiProperty({ description: '퇴거일', required: false })
  readonly endAt: string | Date;
  @IsOptional()
  @ApiProperty({ description: '구매자명', required: false })
  readonly clientName: string;
  @IsOptional()
  @ApiProperty({ description: '구매자이메일', required: false })
  readonly clientEmail: string;
  @IsOptional()
  @ApiProperty({ description: '구매자연락처1', required: false })
  readonly clientPhone1: string;
  @IsOptional()
  @ApiProperty({ description: '구매자연락처2', required: false })
  readonly clientPhone2: string;
  @IsOptional()
  @ApiProperty({ description: '우편번호', required: false })
  readonly inPostCode: string;
  @IsOptional()
  @ApiProperty({ description: '주소', required: false })
  readonly inAddr1: string;
  @IsOptional()
  @ApiProperty({ description: '상세주소', required: false })
  readonly inAddr2: string;
  @IsOptional()
  @ApiProperty({ description: '배송 이름', required: false })
  readonly shipName: string;
  @IsOptional()
  @ApiProperty({ description: '배송 연락처1', required: false })
  readonly shipPhone1: string;
  @IsOptional()
  @ApiProperty({ description: '배송 연락처1', required: false })
  readonly shipPhone2: string;
  @IsOptional()
  @ApiProperty({ description: '배송 지역', required: false })
  readonly shipArea: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 우편번호', required: false })
  readonly shipPostCode: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 주소', required: false })
  readonly shipAddr1: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 상세 주소', required: false })
  readonly shipAddr2: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 국가', required: false })
  readonly shipNation: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 주', required: false })
  readonly shipState: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 도시', required: false })
  readonly shipCity: string;
  @IsOptional()
  @ApiProperty({ description: '은행명', required: false })
  readonly bank: string;
  @IsOptional()
  @ApiProperty({ description: '계좌번호', required: false })
  readonly account: string;
  @IsOptional()
  @ApiProperty({ description: '예금주', required: false })
  readonly depositer: string;
  @IsOptional()
  @ApiProperty({ description: '예금주명', required: false })
  readonly remitter: string;
  @IsOptional()
  @ApiProperty({ description: '구매자 메모', required: false })
  readonly memo: string;
  @IsOptional()
  @ApiProperty({ description: '관리자 메모', required: false })
  readonly adminMemo: string;
  @IsString()
  @ApiProperty({ description: '구매상품(방) idx' })
  readonly productOptionIdx: string;
  @IsOptional()
  @ApiProperty({ description: '주문상품 idx', required: false })
  readonly orderProductIdx: string;
}
