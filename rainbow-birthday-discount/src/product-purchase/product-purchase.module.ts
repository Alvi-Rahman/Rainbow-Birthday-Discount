import { Module } from '@nestjs/common';
import { ProductPurchaseController } from './product-purchase.controller';
import { ProductPurchaseService } from './product-purchase.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [ProductPurchaseController],
  providers: [ProductPurchaseService, RainbowLogger],
  exports: [RainbowLogger]
})
export class ProductPurchaseModule {}
