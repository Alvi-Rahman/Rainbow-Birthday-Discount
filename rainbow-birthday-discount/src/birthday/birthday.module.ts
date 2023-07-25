import { Module } from '@nestjs/common';
import { BirthdayController } from './birthday.controller';
import { BirthdayService } from './birthday.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [BirthdayController],
  providers: [BirthdayService, RainbowLogger],
  exports: [RainbowLogger],
})
export class BirthdayModule {}
