import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RainbowLogger } from 'src/utils/logger/logger.service';

@Injectable()
export class RecommenderService {
  private prisma: PrismaClient;

  constructor(private logger: RainbowLogger) {
    this.prisma = new PrismaClient();
  }

  async getUserPurchaseDetails(userId: number): Promise<any[]> {
    try {
      return this.prisma.$queryRaw`
      SELECT 
        CAST(COUNT(prod.id) as INT) as "PurchaseCount",
        u.id as "userId",
        prod.id as "ProductId",
        round(prod.price, 2) as "Price",
        prod.category,
        prod.item,
        prod.variety
        FROM purchases AS pur
        INNER JOIN users AS u ON u.id = pur.userid
        INNER JOIN "ProductPurchase" AS prodpur ON prodpur.purchaseid = pur.id
        INNER JOIN "Product" AS prod ON prod.id = prodpur.productid
        WHERE u.id = ${userId}
        GROUP BY 
        "userId", 
        "ProductId",
        "Price",
        prod.category,
        prod.item,
        prod.variety
        ORDER BY "PurchaseCount" desc;
    `;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async getUserViewedDetails(userId: number): Promise<any[]> {
    try {
      return this.prisma.$queryRaw`
            SELECT 
            u.id as "userId",
            upv."viewCount",
            prod.id as "ProductId",
            round(prod.price, 2) as "Price",
            prod.category,
            prod.item,
            prod.variety
            FROM "UserProductView" as upv
            INNER JOIN "Product" as prod on prod.id = upv.productid
            INNER JOIN users AS u ON u.id = upv.userid
            WHERE u.id = ${userId}
            order by upv."viewCount" desc;
        `;
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async calculatePoints(list1, list2) {
    try {
      const combinedList = [...list1, ...list2];
      const combinedObj = Object();
      for (let index = 0; index < combinedList.length; index++) {
        const element = combinedList[index];
        if ('viewCount' in element) {
          element['Point'] = element['viewCount'] * 2;
          delete element['viewCount'];
        } else {
          element['PurchaseCount'] = element['PurchaseCount'] * 5;
          delete element['PurchaseCount'];
        }

        if (element['ProductId'] in combinedObj) {
          combinedObj[element['ProductId']]['Point'] += element['Point'];
        } else {
          combinedObj[element['ProductId']] = element;
        }
      }
      const newArray = [];

      for (const k in combinedObj) {
        newArray.push(combinedObj[k]);
      }
      newArray.sort(function (a, b) {
        return b.Point - a.Point;
      });

      return newArray.slice(0, 20);
    } catch (error) {
      console.error(error.message);
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
