// product-purchase.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with the path to your Prisma service
import { ProductPurchaseDTO } from './dto';

@Injectable()
export class ProductPurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async createProductPurchase(data: ProductPurchaseDTO): Promise<any> {
    return this.prisma.productPurchase.create({
      data: {
        productid: data.productid,
        purchaseid: data.purchaseid
      },
    });
  }
}
