import { Module } from '@nestjs/common';
import {
  MessageProducerService,
  MessageConsumer,
  EmailConsumer,
} from './queue.service';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue(
      {
        name: 'message-queue',
      },
      {
        name: 'email-queue',
      },
    ),
  ],
  providers: [
    MessageProducerService,
    MessageConsumer,
    EmailConsumer,
    RainbowLogger,
  ],
  controllers: [QueueController],
  exports: [RainbowLogger],
})
export class QueueModule {}
