import { Injectable } from '@nestjs/common';
import { CreateYahooDto } from './dto/create-yahoo.dto';
import { UpdateYahooDto } from './dto/update-yahoo.dto';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class YahooService {
  async getAutoCompleteList(query) {
    return await yahooFinance.search(query, {
      quotesCount: 10,
    });
  }

  async getPortfolioHistory() {
    let today = new Date();
    let todayString = `${
      today.getFullYear() - 1
    }-${today.getMonth()}-${today.getDate()}`;

    return await yahooFinance.historical('005930.KS', {
      period1: todayString,
    });
  }
}
