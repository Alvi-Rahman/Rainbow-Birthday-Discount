// purchase.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with the path to your Prisma service
import { PurchaseDTO } from './dto';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private logger: RainbowLogger
    ) {}

  async createPurchase(data: PurchaseDTO): Promise<any> {
    try {
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
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
