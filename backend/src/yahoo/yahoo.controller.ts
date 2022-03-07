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

  @UseGuards(AuthGuard)
  @Get()
  async getPortfolioHistory(@Query('authorization', ParseTokenPipe) { uid }) {
    console.log('[GET] /yahoo/auto');
    return await this.yahooService.getPortfolioHistory();
  }
}
