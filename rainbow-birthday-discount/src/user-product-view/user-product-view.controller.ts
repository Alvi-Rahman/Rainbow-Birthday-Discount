// user-product-view.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserProductViewService } from './user-product-view.service';
import { UserProductViewDTO } from './dto';

@Controller('user-product-view')
export class UserProductViewController {
  constructor(private readonly userProductViewService: UserProductViewService) {}

  @Post()
  async createUserProductView(@Body() data: UserProductViewDTO) {
    return this.userProductViewService.createUserProductView(data);
  }
}
