import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class PurchaseDTO {

    @IsNumber()
    @IsNotEmpty()
    userid: number;

    @IsArray()
    productids: number[];
  }
  