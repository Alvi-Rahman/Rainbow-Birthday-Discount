import { Module } from '@nestjs/common';
import { RecommenderController } from './recommender.controller';
import { RecommenderService } from './recommender.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [RecommenderController],
  providers: [RecommenderService, RainbowLogger],
  exports: [RainbowLogger],
})
export class RecommenderModule {}
