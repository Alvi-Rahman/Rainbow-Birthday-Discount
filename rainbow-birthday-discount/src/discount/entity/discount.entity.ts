import { Prisma } from '.prisma/client';

export class Discount implements Prisma.DiscountUncheckedCreateInput {
  id?: number;
  userid: number;
  discountCode: string;
  expirationDate: Date;
}
