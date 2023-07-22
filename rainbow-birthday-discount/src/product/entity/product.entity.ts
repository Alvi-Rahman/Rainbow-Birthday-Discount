import { Prisma } from '@prisma/client';

export class Product implements Prisma.ProductCreateInput {
  id?: number;
  name: string;
  description: string;
  price: Prisma.Decimal;
  unit: string;
  category: string;
  item: string;
  variety: string;
}
