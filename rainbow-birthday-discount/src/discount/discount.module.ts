import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService, RainbowLogger],
  exports: [RainbowLogger],
})
export class DiscountModule {}
