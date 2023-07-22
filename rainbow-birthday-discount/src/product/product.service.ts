import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createMany(data: Array<CreateProductDto>): Promise<any> {
    return this.prisma.product.createMany({ data });
  }

  async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: { ...data} });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOneById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
