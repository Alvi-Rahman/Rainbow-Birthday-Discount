import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DiscountModule } from './discount/discount.module';
import { ProductModule } from './product/product.module';
import { UserProductViewModule } from './user-product-view/user-product-view.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductPurchaseModule } from './product-purchase/product-purchase.module';
import { BirthdayModule } from './birthday/birthday.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    DiscountModule,
    ProductModule,
    UserProductViewModule,
    PurchaseModule,
    ProductPurchaseModule,
    BirthdayModule,
  ],
})
export class AppModule {}
