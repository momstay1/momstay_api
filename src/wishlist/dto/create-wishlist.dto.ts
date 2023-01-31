import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateWishlistDto {
  @IsNumber()
  @ApiProperty({ description: '숙소 idx' })
  readonly product_idx: number;
}
