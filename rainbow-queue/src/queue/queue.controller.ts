import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessageProducerService } from './queue.service';
import { QueueDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: MessageProducerService) {}

  @Post('add-job')
  async addJob(@Body() data: Array<QueueDto>[]): Promise<object> {
    await this.queueService.addMessageJob(data);
    return { message: 'Job added to the queue' };
  }

  //   @Get('process-job')
  //   async processJob(): Promise<string> {
  //     // Process the jobs in the 'message-queue'
  //     await this.queueService.processMessageJob(async (data) => {
  //       console.log('Processing job with data:', data);
  //       // Perform the job processing logic here
  //     });
  //     return 'Jobs in the queue processed';
  //   }
}
