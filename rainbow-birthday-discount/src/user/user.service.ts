import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private logger: RainbowLogger
    ) {}

  async editUser(
    userid: number,
    dto: EditUserDto,
  ) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          ...dto,
        },
      });
  
      delete user.password;
  
      return user;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async getUser(
    userid: number
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userid,
        },
      });
  
      delete user.password;
  
      return user;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }  
}
