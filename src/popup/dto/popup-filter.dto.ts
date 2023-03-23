import { IsOptional } from 'class-validator';

export class PopupFilterDto {
  @IsOptional()
  take: number = 10;
  @IsOptional()
  page: number = 1;
}
