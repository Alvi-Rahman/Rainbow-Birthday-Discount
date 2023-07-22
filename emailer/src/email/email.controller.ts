import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtGuard } from 'src/auth/guard';

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
  ): Promise<object> {
    try {
      return await this.emailService.sendEmail(
        emailData.userId,
        emailData.to,
        emailData.subject,
        emailData.htmlId,
      );
      //   return 'Email sent successfully';
    } catch (error) {
      console.log(error);
      return { message: 'Failed to send email' };
    }
  }
}
