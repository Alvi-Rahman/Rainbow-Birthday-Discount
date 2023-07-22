import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class BirthdayService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUsersWithBirthdayInOneWeek(): Promise<any> {
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
  }
}
