import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('createMany')
  @SetMetadata('role', 'USER')
  createMany(@Body() data: Array<CreateProductDto>): Promise<Product> {
    return this.productService.createMany(data);
  }

  @Post()
  @SetMetadata('role', 'ADMIN')
  create(@Body() data: CreateProductDto): Promise<Product> {
    console.log(data);
    return this.productService.create(data);
  }

  @SetMetadata('role', 'USER')
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
  
  @SetMetadata('role', 'ADMIN')
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }
  
  @SetMetadata('role', 'ADMIN')
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, data);
  }
  
  @SetMetadata('role', 'ADMIN')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
