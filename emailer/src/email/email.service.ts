import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'node-html-parser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private encodeToken: string;
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'takrim.amazon.5@gmail.com',
        pass: 'fbmziqxdmjruhcnn',
      },
    });
  }

  async sendEmail(
    userId: number,
    to: string,
    subject: string,
    htmlId: number,
  ): Promise<object> {
    const htmlObj = await this.prisma.email.findUnique({
      where: {
        id: htmlId,
      },
    });
    this.encodeToken = await this.getSignInToken();
    const html: any = await this.getHtmlContent(htmlObj, userId);
    // console.log(html);
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'noreply@gmail.com',
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { messege: 'Email Sent Successfully!' };

      // console.log(response);
    } catch (error) {
      // Handle any errors that might occur during email sending
      console.error('Error sending email:', error);
    }
  }

  async getHtmlContent(htmlObj, userId) {
    const mainHtml = parse(htmlObj.html_content);
    // console.log(htmlObj.title);
    const recommendedProducts = await this.getRecomendedProducts(userId);
    // console.log(recommendedProducts.length);
    const discountCode = await this.getDiscountCode(userId);
    for (let index = 0; index < recommendedProducts.length; index++) {
      const element = recommendedProducts[index];
      const entity = parse(htmlObj.entity);
      entity.querySelector(
        `div.${htmlObj.title}`,
      ).innerHTML = `${element['item']}`;
      entity.querySelector(
        `div.${htmlObj.price}`,
      ).innerHTML = `GBP ${parseFloat(element['Price']).toFixed(2)}`;
      mainHtml.querySelector(`div#${htmlObj.selector}`).appendChild(entity);
    }
    mainHtml.querySelector('span#discount-id').innerHTML = discountCode;
    return mainHtml.innerHTML;
  }

  async getRecomendedProducts(userId) {
    const recommenderUrl = `http://127.0.0.1:3331/recommender/${userId}`;
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.encodeToken}`,
    };

    const response = await firstValueFrom(
      this.httpService.get(recommenderUrl, { headers: headersRequest }),
    );
    return response.data;
  }

  async getDiscountCode(userId) {
    const payload = {
      userid: userId,
      expirationDate: await this.GetExpirationDate(7),
    };
    const discountUrl = 'http://localhost:3333/discounts/';
    const headersRequest = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.encodeToken}`,
    };

    const response = await firstValueFrom(
      this.httpService.post(discountUrl, payload, { headers: headersRequest }),
    );
    return response.data.discountCode;
  }

  async GetExpirationDate(days: number): Promise<Date> {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  async getSignInToken() {
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
  }
}
