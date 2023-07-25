import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { parse } from 'node-html-parser';
import { ConfigService } from '@nestjs/config';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private encodeToken: string;
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService,
    private logger: RainbowLogger,
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
    try {
      const htmlObj = await this.prisma.email.findUnique({
        where: {
          id: htmlId,
        },
      });
      this.encodeToken = await this.getSignInToken();
      const html: any = await this.getHtmlContent(htmlObj, userId);
      // console.log(html);
      if (html === null) {
        throw new Error('Failed to Parse Html!');
      }
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'noreply@gmail.com',
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
      return { messege: 'Email Sent Successfully!' };

      // console.log(response);
    } catch (error) {
      // Handle any errors that might occur during email sending
      // console.error('Error sending email:', error);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async getHtmlContent(htmlObj, userId) {
    try {
      const mainHtml = parse(htmlObj.html_content);
      // console.log(htmlObj.title);
      const recommendedProducts = await this.getRecomendedProducts(userId);
      // console.log(recommendedProducts.length);
      const discountCode = await this.getDiscountCode(userId);
      const fruitImages = [
        'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2749&q=80',
        'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1202&q=80',
        'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80',
        'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
        'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80',
        'https://images.unsplash.com/photo-1566842600175-97dca489844f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80',
        'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        'https://plus.unsplash.com/premium_photo-1667052026966-d322b94f57a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
        'https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80',
        'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1600423115367-87ea7661688f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        'https://images.unsplash.com/photo-1528821128474-27f963b062bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        'https://plus.unsplash.com/premium_photo-1667251753900-9cfe2ac2d756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1591287083773-9a52ba8184a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1675&q=80',
        'https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
        'https://images.unsplash.com/photo-1457296898342-cdd24585d095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
        'https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=820&q=80',
      ];
      const imgSrcStart = '<img width="100px" src=';
      const imgSrcEnd = 'alt="Product 1">';
      for (let index = 0; index < recommendedProducts.length; index++) {
        const element = recommendedProducts[index];
        const entity = parse(htmlObj.entity);
        entity.querySelector(
          `div.${htmlObj.title}`,
        ).innerHTML = `${element['item']}`;
        entity.querySelector(
          `div.${htmlObj.price}`,
        ).innerHTML = `GBP ${parseFloat(element['Price']).toFixed(2)}`;
        const ProdImage = `${imgSrcStart}${[fruitImages[index]]} ${imgSrcEnd}`;

        entity.querySelector(`div.product-image`).innerHTML = ProdImage;

        mainHtml.querySelector(`div#${htmlObj.selector}`).appendChild(entity);
      }
      mainHtml.querySelector('span#discount-id').innerHTML = discountCode;
      return mainHtml.innerHTML;
    } catch (error) {
      // console.error('Error sending email:', error);
      this.logger.error(error.message, error.stack);
      return null;
    }
  }

  async getRecomendedProducts(userId) {
    try {
      const recommenderUrl = `http://127.0.0.1:3331/recommender/${userId}`;
      const headersRequest = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.encodeToken}`,
      };

      const response = await firstValueFrom(
        this.httpService.get(recommenderUrl, { headers: headersRequest }),
      );
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async getDiscountCode(userId) {
    try {
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
        this.httpService.post(discountUrl, payload, {
          headers: headersRequest,
        }),
      );
      return response.data.discountCode;
    } catch (error) {
      console.error('Error sending email:', error);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async GetExpirationDate(days: number): Promise<Date> {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
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
      console.error('Error sending email:', error);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
