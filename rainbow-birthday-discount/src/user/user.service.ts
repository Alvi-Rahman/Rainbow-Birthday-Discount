import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userid: number,
    dto: EditUserDto,
  ) {
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
  }

  async getUser(
    userid: number
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    delete user.password;

    return user;
  }

  
}
