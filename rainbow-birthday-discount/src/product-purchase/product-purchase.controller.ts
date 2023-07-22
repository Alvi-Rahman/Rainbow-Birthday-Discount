// product-purchase.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ProductPurchaseService } from './product-purchase.service';
import { ProductPurchaseDTO } from './dto';

@Controller('product-purchases')
export class ProductPurchaseController {
  constructor(private readonly productPurchaseService: ProductPurchaseService) {}

  @Post()
  async createProductPurchase(@Body() data: ProductPurchaseDTO) {
    return this.productPurchaseService.createProductPurchase(data);
  }
}
