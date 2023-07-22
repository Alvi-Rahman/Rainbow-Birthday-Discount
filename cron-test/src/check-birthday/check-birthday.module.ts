import { Module } from '@nestjs/common';
import { CheckBirthdayService } from './check-birthday.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CheckBirthdayService],
})
export class CheckBirthdayModule {}
