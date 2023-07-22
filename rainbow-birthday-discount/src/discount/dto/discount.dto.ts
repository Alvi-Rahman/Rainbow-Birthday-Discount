import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscountDto {

  @IsNumber()
  @IsNotEmpty()
  userid: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expirationDate: Date;

  disCountCode: string;
}

export class UpdateDiscountDto {
  discountCode?: string;
  expirationDate?: Date;
}
