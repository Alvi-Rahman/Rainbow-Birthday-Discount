import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entity';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private logger: RainbowLogger
  ) {}

  async signup(dto: SignUpDto) {
    // generate the password hash
    dto.password = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });

      return this.signToken(user);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          console.error(error.message);
          this.logger.error(error.message, error.stack);
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    // find the user by email
    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
      if (!user)
        throw new ForbiddenException(
          'Credentials incorrect',
        );

      const match = await argon.verify(
        user.password,
        dto.password,
      );
      
      if (!match)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
      return this.signToken(user);
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async signToken(
    payload: User,
  ): Promise<{ access_token: string }> {
    
    try {
      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(
        payload,
        {
          expiresIn: '6h',
          secret: secret,
        },
      );

      return {
        access_token: token,
      };
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
