import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { YahooService } from './yahoo.service';
import { CreateYahooDto } from './dto/create-yahoo.dto';
import { UpdateYahooDto } from './dto/update-yahoo.dto';
import { ParseTokenPipe } from 'src/pipe/parse-token.pipe';
import { AssetService } from 'src/asset/asset.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('yahoo')
export class YahooController {
  constructor(
    private readonly yahooService: YahooService,
    private readonly assetService: AssetService,
  ) {}

  @Get('/auto')
  async getAutoCompleteList(@Query('query') query) {
    console.log('[GET] /yahoo/auto');
    return await this.yahooService.getAutoCompleteList(query);
  }

  @Get('/asset')
  async getAssetInfo(@Query('assetCode') assetCode) {
    console.log('[GET] /yahoo/asset');
    return await this.yahooService.getAssetInfo(assetCode);
  }

  @Get('/assetHistory')
  async getAssetHistory(@Query('assetCode') assetCode) {
    console.log('[GET] /yahoo/assetHistory', assetCode);
    return await this.yahooService.getAssetHistory(assetCode);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getPortfolioHistory(@Query('authorization', ParseTokenPipe) { uid }) {
    console.log('[GET] /yahoo/auto');
    return await this.yahooService.getPortfolioHistory();
  }

  @Get('usd')
  async getCurrencyToUSD(@Query('currency') currency) {
    console.log('[GET] /yahoo/usd');
    return await this.yahooService.getCurrencyToUSD(currency);
  }

  @Get('krw')
  async getUSDToKRW() {
    console.log('[GET] /yahoo/krw');
    return await this.yahooService.getUSDToKRW();
  }
}
