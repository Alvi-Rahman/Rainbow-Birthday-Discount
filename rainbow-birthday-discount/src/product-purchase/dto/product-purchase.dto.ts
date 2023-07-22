import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductPurchaseDTO {

    @IsNotEmpty()
    @IsNumber()
    productid: number;

    @IsNotEmpty()
    @IsNumber()
    purchaseid: number;
  }
  