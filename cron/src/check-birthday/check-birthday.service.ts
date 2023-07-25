import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class CheckBirthdayService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private logger: RainbowLogger,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendPostRequest(): Promise<AxiosResponse> {
    try {
      const birthdayUrl = 'http://127.0.0.1:3333/get/birthdays/';
      const dataToSend = await firstValueFrom(
        this.httpService.get(birthdayUrl),
      );
      console.log(dataToSend.data);
      const url = 'http://127.0.0.1:3335/queue/add-job/';
      const encodeToken = await this.getSignInToken();

      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${encodeToken}`,
      };
      //   const response = await this.httpService.post(url, dataToSend).toPromise();
      const response = await firstValueFrom(
        this.httpService.post(url, dataToSend.data, {
          headers: headersRequest,
        }),
      );
      console.log('Success sending POST request:');
      return response;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      // throw error;
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
    }
  }
}
