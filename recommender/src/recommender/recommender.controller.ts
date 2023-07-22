import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RecommenderService } from './recommender.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('recommender')
export class RecommenderController {
  constructor(private readonly purchaseDetails: RecommenderService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) userid: number): Promise<any> {
    const purchaseDetails = await this.purchaseDetails.getUserPurchaseDetails(
      userid,
    );
    const viewedDetails = await this.purchaseDetails.getUserViewedDetails(
      userid,
    );
    return this.purchaseDetails.calculatePoints(purchaseDetails, viewedDetails);
    // return viewedDetails;
  }
}
