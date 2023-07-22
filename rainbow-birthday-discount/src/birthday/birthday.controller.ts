import { Controller, Get } from '@nestjs/common';
import { BirthdayService } from './birthday.service';
import { Prisma } from '@prisma/client';

@Controller('get')
export class BirthdayController {
  constructor(private readonly appService: BirthdayService) {}

  @Get('birthdays')
  async getUsersWithBirthdayInOneWeek(): Promise<any> {
    return this.appService.getUsersWithBirthdayInOneWeek();
  }
}
