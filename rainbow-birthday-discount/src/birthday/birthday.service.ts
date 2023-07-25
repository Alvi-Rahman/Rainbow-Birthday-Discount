import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class BirthdayService {
  private prisma: PrismaClient;

  constructor(private logger: RainbowLogger) {
    this.prisma = new PrismaClient()
  }

  async getUsersWithBirthdayInOneWeek(): Promise<any> {
    try {
      return this.prisma.$queryRaw`
        SELECT 
        "id",
        "firstName",
        "lastName",
        "email",
        "birthday",
        "role"
        FROM users
        WHERE 
        emailsent = false 
        AND
        EXTRACT(DOY FROM birthday) 
        BETWEEN EXTRACT(DOY FROM CURRENT_DATE) 
        AND 
        EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
        OR 
        (EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days') 
        < EXTRACT(DOY FROM CURRENT_DATE) 
        AND EXTRACT(DOY FROM birthday) >= EXTRACT(DOY FROM CURRENT_DATE))
        ORDER BY EXTRACT(DOY FROM birthday);
    `;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
