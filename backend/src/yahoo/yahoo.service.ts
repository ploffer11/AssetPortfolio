import { BadRequestException, Injectable } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class YahooService {
  /**
   * 사용자가 검색창에 입력한 query에 맞는 Auto Complete List를 반환
   * @param query
   * @returns
   */
  async getAutoCompleteList(query: string) {
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

  /**
   * assetCode에 해당하는 자산의 {price, currency, currencySymbol} 을 반환
   * @param assetCode
   * @returns
   * ! 200
   * @throws
   * ! BadRequest
   */
  async getAssetInfo(assetCode: string) {
    try {
      let res = await yahooFinance.quoteSummary(assetCode, {
        modules: ['price'],
      });
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

  /**
   * assetCode에 해당하는 자산의 1년치 history를 반환
   * @param assetCode
   * @returns
   */
  async getAssetHistory(assetCode: string) {
    let today = new Date();
    let todayString = `${
      today.getFullYear() - 1
    }-${today.getMonth()}-${today.getDate()}`;

    return await yahooFinance.historical(assetCode, {
      period1: todayString,
    });
  }

  /**
   * currency에 해당하는 화페의 1단위가 몇 달러인지 반환 (1KRW = $0.001)
   * @param currency
   * @returns
   * ! 200
   * @throws
   * ! BadRequest
   */
  async getCurrencyToUSD(currency: string) {
    try {
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

  /**
   * 1달러가 현재 몇 KRW 인지 반환 ($1 = 1000KRW)
   * @returns
   */
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

  /**
   * 포트폴리오 전체 합을 반환하는 함수
   * @returns
   */
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
