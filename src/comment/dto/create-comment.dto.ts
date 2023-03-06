import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '댓글 상태 (1: 삭제, 2: 등록)' })
  readonly status: number;
  @IsOptional()
  @ApiProperty({ description: '대댓글 부모 idx (첫 댓글인 경우 backend에서 처리)', required: false })
  readonly parentIdx: number;
  @IsString()
  @ApiProperty({ description: '댓글 참조할 카테고리 (bc: 게시판)' })
  readonly category: string;
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '댓글 참조할 idx' })
  readonly foreignIdx: number;
  @IsString()
  @ApiProperty({ description: '댓글 내용' })
  readonly contents: string;
  @IsString()
  @ApiProperty({ description: '댓글 작성자 명' })
  readonly name: string;
  @IsOptional()
  @ApiProperty({ description: '비회원 댓글 작성시 비밀번호', required: false })
  readonly password: string;
  @IsOptional()
  @ApiProperty({ description: '권한 관련 처리시 사용할 정보(사용X)', required: false })
  readonly author: string;
}
