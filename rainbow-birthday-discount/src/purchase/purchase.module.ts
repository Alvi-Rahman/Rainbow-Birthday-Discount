import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, RainbowLogger],
  exports: [RainbowLogger]
})
export class PurchaseModule {}
