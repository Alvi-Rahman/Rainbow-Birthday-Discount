import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, SetMetadata, ParseIntPipe } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './entity';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() data: CreateDiscountDto): Promise<Discount> {
    return this.discountService.create(data);
  }

  @Get()
  findAll(): Promise<Discount[]> {
    return this.discountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Discount> {
    return this.discountService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateDiscountDto): Promise<Discount> {
    return this.discountService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.discountService.remove(id);
  }
}
