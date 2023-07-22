// user-product-view.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with the path to your Prisma service
import { UserProductViewDTO } from './dto';

@Injectable()
export class UserProductViewService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserProductView(data: UserProductViewDTO): Promise<any> {
    return this.prisma.userProductView.create({
      data: {
        productid: data.productid,
        userid: data.userid,
        viewCount: data.viewCount,
      },
    });
  }
}
