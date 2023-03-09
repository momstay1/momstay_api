import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 idx', required: false })
  readonly idx: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 상태 <br>(0: 미등록, 1: 미사용, 2: 사용)', required: false })
  readonly status: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 유형', required: false })
  readonly type: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '멤버쉽 유무(0: 미사용, 1: 사용)', default: 0, required: false })
  readonly membership: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '사업자 구분 <br>(1: 개인사업자, 2: 법인사업자, 3: 개인)', required: false })
  readonly hostBusiness: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 명', required: false })
  readonly title: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 명(영어)', required: false })
  readonly titleEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 명(일본어)', required: false })
  readonly titleJpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '숙소 명(중국어)', required: false })
  readonly titleChn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '우편번호', required: false })
  readonly postCode: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '주소', required: false })
  readonly addr1: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '주소(영어)', required: false })
  readonly addr1Eng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '주소(일본어)', required: false })
  readonly addr1Jpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '주소(중국어)', required: false })
  readonly addr1Chn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세주소', required: false })
  readonly addr2: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세주소(영어)', required: false })
  readonly addr2Eng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세주소(일본어)', required: false })
  readonly addr2Jpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세주소(중국어)', required: false })
  readonly addr2Chn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '호스트 사용 언어 <br>(KR: 한국어, EN: 영어, JP: 일어, CH: 중국어)', example: "KR,EN", default: "KR", required: false })
  readonly language: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '지하철', required: false })
  readonly metro: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '위도', required: false })
  readonly lat: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '경도', required: false })
  readonly lng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '대학', required: false })
  readonly college: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세설명', required: false })
  readonly detailsKor: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세설명 영어', required: false })
  readonly detailsEng: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세설명 일어', required: false })
  readonly detailsJpn: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '상세설명 중국어', required: false })
  readonly detailsChn: string;
  @IsString()
  @ApiProperty({ description: '회원 idx' })
  readonly userIdx: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '유지될 파일 idx <br> (ex> 33,34)', required: false })
  readonly filesIdx: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '생활 및 편의 <br> (ex> 33,34)', required: false })
  readonly productInfoIdx: string;

  @IsOptional()
  @ApiProperty({ format: 'binary', description: '대표 사진', required: false })
  readonly lodgingDetailImg: string[];
  @IsOptional()
  @ApiProperty({ format: 'binary', description: '식사 서비스 사진', required: false })
  readonly mealsImg: string[];
}
