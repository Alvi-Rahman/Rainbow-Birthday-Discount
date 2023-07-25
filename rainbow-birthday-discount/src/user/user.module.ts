import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Module({
  controllers: [UserController],
  providers: [UserService, RainbowLogger],
  exports: [RainbowLogger]
})
export class UserModule {}
