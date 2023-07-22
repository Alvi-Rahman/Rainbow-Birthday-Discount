import { Module } from '@nestjs/common';
import { UserProductViewController } from './user-product-view.controller';
import { UserProductViewService } from './user-product-view.service';

@Module({
  controllers: [UserProductViewController],
  providers: [UserProductViewService]
})
export class UserProductViewModule {}
