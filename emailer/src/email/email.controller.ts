import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtGuard } from 'src/auth/guard';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async sendEmail(
    @Body()
    emailData: {
      userId: number;
      to: string;
      subject: string;
      htmlId: number;
    },
    @Res() res: Response,
  ): Promise<object> {
    try {
      const response = await this.emailService.sendEmail(
        emailData.userId,
        emailData.to,
        emailData.subject,
        emailData.htmlId,
      );
      if (response instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json();
      } else {
        return res.status(HttpStatus.OK).json(response);
      }
    } catch (error) {
      // console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json();
    }
  }
}
