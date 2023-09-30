import axios from 'axios';
import CustomError from '../util/errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Deposits {
  public base_url: string;

  public options: { headers: { Authorization: string } };

  constructor(public api_key: string) {
    this.base_url = 'https://www.quidax.com/api/v1';
    this.options = {
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    };
  }

  public async fetch_single_deposit(user_id: string, deposit_id: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/deposits/${deposit_id}`,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_all_deposit(user_id: string, currency: string, state: string, per_page: string, page: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/deposits?currency=${currency}&state=${state}&per_page=${per_page}&page=${page}`,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Deposits;
