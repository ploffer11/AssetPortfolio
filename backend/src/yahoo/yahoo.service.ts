import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateYahooDto } from './dto/create-yahoo.dto';
import { UpdateYahooDto } from './dto/update-yahoo.dto';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class YahooService {
  async getAutoCompleteList(query) {
    try {
      let res = await yahooFinance.search(query, {
        quotesCount: 10,
      });
      return {
        statusCode: 200,
        autoCompleteList: res.quotes,
        message: 'Get autoCompleteList.',
      };
    } catch (e) {
      throw new BadRequestException('Wrong query.');
    }
  }

  async getAssetInfo(symbol) {
    try {
      let res = await yahooFinance.quoteSummary(symbol, { modules: ['price'] });
      console.log(res);
      return {
        statusCode: 200,
        price: res.price.regularMarketPrice,
        currency: res.price.currency,
        currencySymbol: res.price.currencySymbol,
      };
    } catch (e) {
      throw new BadRequestException('Wrong symbol.');
    }
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

  async getCurrencyToUSD(currency) {
    try {
      // 1 currency가 몇 달러인가
      let symbol = `${currency.toUpperCase()}USD=X`;
      let res = await yahooFinance.quoteSummary(symbol, { modules: ['price'] });
      return {
        statusCode: 200,
        price: res.price.regularMarketPrice,
      };
    } catch (e) {
      throw new BadRequestException('Wrong currency');
    }
  }

  async getUSDToKRW() {
    try {
      // 1 달러가 몇 krw인가
      let symbol = 'KRW=X';
      let res = await yahooFinance.quoteSummary(symbol, { modules: ['price'] });
      return {
        statusCode: 200,
        price: res.price.regularMarketPrice,
      };
    } catch (e) {
      throw new BadRequestException('Something wrong.');
    }
  }
}
