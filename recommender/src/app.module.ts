import { Module } from '@nestjs/common';
import { RecommenderModule } from './recommender/recommender.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecommenderModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
