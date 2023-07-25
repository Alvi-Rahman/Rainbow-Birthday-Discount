import { Injectable } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import { QueueDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class MessageProducerService {
  constructor(
    @InjectQueue('message-queue') private queue: Queue,
    private logger: RainbowLogger,
  ) {}

  async addMessageJob(data: Array<QueueDto>[]) {
    try {
      await this.queue.add('message-job', {
        data,
      });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
    }
  }
}

@Processor('message-queue')
export class MessageConsumer {
  constructor(
    @InjectQueue('email-queue') private queue: Queue,
    private readonly httpService: HttpService,
    private config: ConfigService,
    private logger: RainbowLogger,
  ) {}

  @Process('message-job')
  async readOperationJob(job: Job<QueueDto>) {
    try {
      const data = job.data['data'];
      // console.log(data);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const payload = {
          userId: element['id'],
          to: element['email'],
          subject: `Birthday Discount ${element['firstName']} ${element['lastName']}`,
          htmlId: 1,
        };

        const encodeToken = await this.getSignInToken();
        const headersRequest = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${encodeToken}`,
        };
        // console.log(encodeToken);

        const emailUrl = `http://127.0.0.1:3336/emails`;
        const response = await firstValueFrom(
          this.httpService.post(emailUrl, payload, { headers: headersRequest }),
        );
        console.log(response.status);
        if (response.status == 200) {
          await this.queue.add('email-job', {
            ...element,
          });
        } else {
          console.error(response.data);
          this.logger.error(response.data, response.data);
        }
      }
      // await this.queue.add('email-job', {
      //   ...data,
      // });
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
    }
  }

  async getSignInToken() {
    try {
      const email = this.config.get('EMAIL');
      const password = this.config.get('PASSWORD');

      const signInpayload = {
        email,
        password,
      };
      const signInUrl = 'http://127.0.0.1:3333/auth/signIn/';

      const response = await firstValueFrom(
        this.httpService.post(signInUrl, signInpayload),
      );
      return response.data.access_token;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}

@Processor('email-queue')
export class EmailConsumer {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private logger: RainbowLogger,
  ) {}

  @Process('email-job')
  async doOperationJob(job: Job<QueueDto>) {
    try {
      const data = job.data;
      // console.log(data);
      const emailsentUrl = `http://127.0.0.1:3333/users/${data['id']}`;

      const encodeToken = await this.getSignInToken();
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${encodeToken}`,
      };

      const _ = await firstValueFrom(
        this.httpService.patch(
          emailsentUrl,
          { emailsent: true },
          { headers: headersRequest },
        ),
      );
      // console.log(response.data);
      // console.log(data);
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
    }
  }

  async getSignInToken() {
    try {
      const email = this.config.get('EMAIL');
      const password = this.config.get('PASSWORD');

      const signInpayload = {
        email,
        password,
      };
      const signInUrl = 'http://127.0.0.1:3333/auth/signIn/';

      const response = await firstValueFrom(
        this.httpService.post(signInUrl, signInpayload),
      );
      return response.data.access_token;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
