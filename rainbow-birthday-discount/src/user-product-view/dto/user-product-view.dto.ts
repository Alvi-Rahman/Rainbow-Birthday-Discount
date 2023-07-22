// user-product-view.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserProductViewDTO {
    @IsNumber()
    @IsNotEmpty()
    productid: number;

    @IsNumber()
    @IsNotEmpty()
    userid: number;
    
    @IsNumber()
    @IsNotEmpty()
    viewCount: number;
  }
  