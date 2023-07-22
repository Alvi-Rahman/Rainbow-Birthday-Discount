// purchase.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with the path to your Prisma service
import { PurchaseDTO } from './dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async createPurchase(data: PurchaseDTO): Promise<any> {
    // Assuming each product in the purchase is associated with the same user.
    const { userid, productids } = data;
    const purchaseData = {
      userid,
      product: {
        create: productids.map((productid) => ({
          productid
        })),
      },
    };

    return this.prisma.purchase.create({
      data: purchaseData,
    });
  }
}
