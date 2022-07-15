import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateBoardContentDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시글 상태 0: 삭제, 1:미등록, 2:등록' })
  status: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시판 타입 1: 공지사항, 2: 일반글 3: 비밀글' })
  type: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시판 index' })
  bd_idx: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '회원 idx' })
  user_idx: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '관리자 idx' })
  admin_idx: string;

  @IsString()
  @ApiProperty({ description: '게시글 작성자' })
  write_name: string;

  @IsString()
  @ApiProperty({ description: '게시글 제목' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시글 링크 상태' })
  link_status: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '게시글 링크 주소' })
  link: string;

  @IsString()
  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '게시글 비밀번호' })
  password: string;

  @IsArray()
  @ApiProperty({ description: '게시글 카테고리 아이디' })
  category: string[];
}