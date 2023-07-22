import { Module } from '@nestjs/common';
import { ProductPurchaseController } from './product-purchase.controller';
import { ProductPurchaseService } from './product-purchase.service';

@Module({
  controllers: [ProductPurchaseController],
  providers: [ProductPurchaseService]
})
export class ProductPurchaseModule {}
