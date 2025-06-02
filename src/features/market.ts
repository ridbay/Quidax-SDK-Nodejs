import axios from 'axios';
import CustomError from '../util/errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Markets {
  public base_url: string;

  public options: { headers: { Authorization: string } };

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.options = {
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    };
  }

  public async fetch_market_tickers() {
    try {
      const response = await axios.get(`${this.base_url}/markets/tickers`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Markets;
