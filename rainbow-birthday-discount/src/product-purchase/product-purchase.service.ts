// product-purchase.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with the path to your Prisma service
import { ProductPurchaseDTO } from './dto';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class ProductPurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private logger: RainbowLogger
    ) {}

  async createProductPurchase(data: ProductPurchaseDTO): Promise<any> {
    try {
      return this.prisma.productPurchase.create({
        data: {
          productid: data.productid,
          purchaseid: data.purchaseid
        },
      });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
