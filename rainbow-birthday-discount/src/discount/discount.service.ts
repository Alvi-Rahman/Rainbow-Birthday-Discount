import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Discount } from './entity';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}

  async generateCode(length: number): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    // Generate a random code with the specified length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    const existingCode = await this.prisma.discount.findUnique({
      where: { discountCode: code },
    });
  
    // Check if the code already exists in the database
    if (existingCode) {
      return this.generateCode(length);
    }
  
    return code;
  }
  
  
  async create(data: CreateDiscountDto): Promise<Discount> {
    const { userid, expirationDate } = data;
    const discountCode = await this.generateCode(8);

    // console.log(discountCode, userid, expirationDate);
    return this.prisma.discount.create({
      data: {
        userid,
        expirationDate,
        discountCode,
      },
    });
  }

  async findAll(): Promise<Discount[]> {
    return this.prisma.discount.findMany();
  }

  async findOneById(id: number): Promise<Discount> {
    return this.prisma.discount.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateDiscountDto): Promise<Discount> {
    return this.prisma.discount.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.discount.delete({ where: { id } });
  }
}
