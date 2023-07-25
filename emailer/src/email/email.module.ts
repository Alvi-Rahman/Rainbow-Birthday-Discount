import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { HttpModule } from '@nestjs/axios';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  imports: [HttpModule],
  providers: [EmailService, RainbowLogger],
  controllers: [EmailController],
  exports: [RainbowLogger],
})
export class EmailModule {}
