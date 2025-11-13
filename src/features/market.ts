import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
// import type { QuidaxApiEnvelope, MarketTicker } from '../types/api';
/**
 * The quidax module for handling all quidax related operations
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Markets {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async fetch_market_tickers(): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/markets/tickers`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchMarketTickers(): Promise<any> {
    return this.fetch_market_tickers();
  }
}

export default Markets;
