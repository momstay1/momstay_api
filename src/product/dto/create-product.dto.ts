import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ description: '숙소 idx' })
  readonly idx: string;
  @ApiProperty({ description: '숙소 상태 (0: 미등록, 1: 미사용, 2: 사용)' })
  readonly status: string;
  @ApiProperty({ description: '숙소 유형' })
  readonly type: string;
  @ApiProperty({ description: '멤버쉽 유무', default: 0 })
  readonly membership: string;
  @ApiProperty({ description: '사업자 구분 (1: 개인사업자, 2: 법인사업자, 3: 개인)' })
  readonly hostBusiness: string;
  @ApiProperty({ description: '숙소 명' })
  readonly title: string;
  @ApiProperty({ description: '우편번호' })
  readonly postCode: string;
  @ApiProperty({ description: '주소' })
  readonly addr1: string;
  @ApiProperty({ description: '상세주소' })
  readonly addr2: string;
  @ApiProperty({ description: '호스트 사용 언어 (KR: 한국어, EN: 영어, JP: 일어, CH: 중국어)', example: "KR,EN", default: "KR" })
  readonly language: string;
  @ApiProperty({ description: '지하철' })
  readonly metro: string;
  @ApiProperty({ description: '위도' })
  readonly lat: string;
  @ApiProperty({ description: '경도' })
  readonly lng: string;
  @ApiProperty({ description: '대학' })
  readonly college: string;
  @ApiProperty({ description: '상세설명' })
  readonly detailsKor: string;
  @ApiProperty({ description: '상세설명 영어' })
  readonly detailsEng: string;
  @ApiProperty({ description: '상세설명 일어' })
  readonly detailsJpn: string;
  @ApiProperty({ description: '상세설명 중국어' })
  readonly detailsChn: string;
  @ApiProperty({ description: '회원 idx' })
  readonly userIdx: string;
}
