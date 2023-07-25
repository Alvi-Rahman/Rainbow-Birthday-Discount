import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private logger: RainbowLogger
    ) {}

  async createMany(data: Array<CreateProductDto>): Promise<any> {
    try {
      return this.prisma.product.createMany({ data });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async create(data: CreateProductDto): Promise<Product> {
    try {
      return this.prisma.product.create({ data: { ...data} });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return this.prisma.product.findMany();
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findOneById(id: number): Promise<Product> {
    try {
      return this.prisma.product.findUnique({ where: { id } });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    try {
      return this.prisma.product.update({ where: { id }, data });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
