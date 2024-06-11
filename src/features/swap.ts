import axios from 'axios';
import CustomError from '../util/errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Swap {
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

  public async create_instant_swap(user_id: string, from_currency: string, to_currency: string, from_amount: string) {
    const body = {
      user_id,
      from_currency,
      to_currency,
      from_amount,
    };
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/swap_quotation`,
        body,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async confirm_instant_swap(user_id: string, quotation_id: string) {
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/swap_quotation/${quotation_id}/confirm`,
        null,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async refresh_instant_swap(
    user_id: string,
    from_currency: string,
    to_currency: string,
    from_amount: string,
    quotation_id: string,
  ) {
    const body = {
      user_id,
      from_currency,
      to_currency,
      from_amount,
    };
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/swap_quotation/${quotation_id}/refresh`,
        body,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_swap_transaction(user_id: string, swap_transaction_id: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/swap_transactions/${swap_transaction_id}`,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async get_swap_transactions(user_id: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/swap_transactions`,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Swap;
