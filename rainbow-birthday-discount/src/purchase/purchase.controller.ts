// purchase.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDTO } from './dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(@Body() data: PurchaseDTO) {
    return this.purchaseService.createPurchase(data);
  }
}
