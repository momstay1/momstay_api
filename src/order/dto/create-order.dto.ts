import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateOrderDto {

  @IsOptional()
  @ApiProperty({ description: '주문 idx' })
  idx: number;
  @IsOptional()
  @ApiProperty({
    description: `상태<br>
    (1:결제대기, 2:결제완료, 3:배송준비(승인 전), 4:배송중(승인 후), 6:구매확정,<br>
    7:취소요청, 8:취소완료, 9:반품요청, 10:반품완료, 11:교환요청, 12:교환완료)` })
  status: number;
  @IsOptional()
  @ApiProperty({ description: '아임포트 uid' })
  readonly imp_uid: string;
  @IsOptional()
  @ApiProperty({ description: '인앱결제 빌링키' })
  readonly billingKey: string;
  @IsOptional()
  @ApiProperty({ description: '결제 방법(bank, card, trans, vbank)' })
  readonly payment: string;
  @IsOptional()
  @ApiProperty({ description: '구매자명' })
  readonly clientName: string;
  @IsOptional()
  @ApiProperty({ description: '구매자이메일' })
  readonly clientEmail: string;
  @IsOptional()
  @ApiProperty({ description: '구매자연락처1' })
  readonly clientPhone1: string;
  @IsOptional()
  @ApiProperty({ description: '구매자연락처2' })
  readonly clientPhone2: string;
  @IsOptional()
  @ApiProperty({ description: '우편번호' })
  readonly inPostCode: string;
  @IsOptional()
  @ApiProperty({ description: '주소' })
  readonly inAddr1: string;
  @IsOptional()
  @ApiProperty({ description: '상세주소' })
  readonly inAddr2: string;
  @IsOptional()
  @ApiProperty({ description: '배송 이름' })
  readonly shipName: string;
  @IsOptional()
  @ApiProperty({ description: '배송 연락처1' })
  readonly shipPhone1: string;
  @IsOptional()
  @ApiProperty({ description: '배송 연락처1' })
  readonly shipPhone2: string;
  @IsOptional()
  @ApiProperty({ description: '배송 지역' })
  readonly shipArea: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 우편번호' })
  readonly shipPostCode: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 주소' })
  readonly shipAddr1: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 상세 주소' })
  readonly shipAddr2: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 국가' })
  readonly shipNation: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 주' })
  readonly shipState: string;
  @IsOptional()
  @ApiProperty({ description: '배송지 도시' })
  readonly shipCity: string;
  @IsOptional()
  @ApiProperty({ description: '은행명' })
  readonly bank: string;
  @IsOptional()
  @ApiProperty({ description: '계좌번호' })
  readonly account: string;
  @IsOptional()
  @ApiProperty({ description: '예금주' })
  readonly depositer: string;
  @IsOptional()
  @ApiProperty({ description: '예금주명' })
  readonly remitter: string;
  @IsOptional()
  @ApiProperty({ description: '구매자 메모' })
  readonly ClientMemo: string;
  @IsOptional()
  @ApiProperty({ description: '관리자 메모' })
  readonly adminMemo: string;
  @IsOptional()
  @ApiProperty({ description: '구매자회원 idx' })
  userIdx: string;
  @IsString()
  @ApiProperty({ description: '구매상품(방) idx' })
  readonly productOptionIdx: string;
  @IsString()
  @ApiProperty({ description: '구매상품 개수' })
  readonly productNum: string;
}
