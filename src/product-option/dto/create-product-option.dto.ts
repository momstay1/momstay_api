import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProductOptionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 idx', required: false })
  readonly idx: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시 상태 <br>(-1: 삭제, 0: 미등록, 1: 미사용, 2: 사용)', required: false })
  readonly status: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 유형', required: false })
  readonly type: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '투숙 상태<br>(1: 공실, 2: 만실)', required: false })
  readonly stayStatus: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방문예약 상태<br>(1: 미사용, 2: 사용)', required: false })
  readonly visitStatus: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '바로결제 상태<br>(1: 미사용, 2: 사용)', required: false })
  readonly paymentStatus: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 이름', required: false })
  readonly title: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 이름(영어)', required: false })
  readonly titleEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 이름(일본어)', required: false })
  readonly titleJpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 이름(중국어)', required: false })
  readonly titleChn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 가격', required: false })
  readonly price: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 달 가격', required: false })
  readonly priceMonth: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 주 가격', required: false })
  readonly priceWeek: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 일 가격', required: false })
  readonly priceDay: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 가격(달러)', required: false })
  readonly priceEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 달 가격(달러)', required: false })
  readonly priceMonthEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 주 가격(달러)', required: false })
  readonly priceWeekEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 일 가격(달러)', required: false })
  readonly priceDayEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 소개(한글)', required: false })
  readonly detailsKor: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 소개(영어)', required: false })
  readonly detailsEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 소개(일어)', required: false })
  readonly detailsJpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 소개(중국어)', required: false })
  readonly detailsChn: string;
  // @IsOptional()
  // @IsString()
  // @ApiProperty({ description: '방 생활 시설', required: false })
  // readonly privateFacility: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 idx', required: false })
  readonly productIdx: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '방 생활 시설 <br> (ex> 33,34)', required: false })
  readonly productInfoIdx: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false })
  readonly filesIdx: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '대표 사진', required: false })
  readonly roomDetailImg: string[];
}
