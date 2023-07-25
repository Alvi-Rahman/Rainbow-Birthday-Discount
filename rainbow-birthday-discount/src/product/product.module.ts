import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, RainbowLogger],
  exports: [RainbowLogger]
})
export class ProductModule {}
