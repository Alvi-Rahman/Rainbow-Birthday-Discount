import { Module } from '@nestjs/common';
import { CheckBirthdayService } from './check-birthday.service';
import { HttpModule } from '@nestjs/axios';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  imports: [HttpModule],
  providers: [CheckBirthdayService, RainbowLogger],
  exports: [RainbowLogger],
})
export class CheckBirthdayModule {}
