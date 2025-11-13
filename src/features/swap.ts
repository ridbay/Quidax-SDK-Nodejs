import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Swap {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async create_instant_swap(user_id: string, from_currency: string, to_currency: string, from_amount: string) {
    const body = {
      user_id,
      from_currency,
      to_currency,
      from_amount,
    };
    try {
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/swap_quotation`,
        body,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async create_temporary_instant_swap(from_currency: string, to_currency: string, from_amount: string) {
    const body = {
      from_currency,
      to_currency,
      from_amount,
    };
    try {
      const response = await this.client.post(
        `${this.base_url}/users/me/temporary_swap_quotation`,
        body,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async confirm_instant_swap(user_id: string, quotation_id: string) {
    try {
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/swap_quotation/${quotation_id}/confirm`,
        null,
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
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/swap_quotation/${quotation_id}/refresh`,
        body,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_swap_transaction(user_id: string, swap_transaction_id: string) {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/swap_transactions/${swap_transaction_id}`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async get_swap_transactions(user_id: string) {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/swap_transactions`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createInstantSwap(user_id: string, from_currency: string, to_currency: string, from_amount: string) {
    return this.create_instant_swap(user_id, from_currency, to_currency, from_amount);
  }

  public async confirmInstantSwap(user_id: string, quotation_id: string) {
    return this.confirm_instant_swap(user_id, quotation_id);
  }

  public async refreshInstantSwap(
    user_id: string,
    from_currency: string,
    to_currency: string,
    from_amount: string,
    quotation_id: string,
  ) {
    return this.refresh_instant_swap(user_id, from_currency, to_currency, from_amount, quotation_id);
  }

  public async fetchSwapTransaction(user_id: string, swap_transaction_id: string) {
    return this.fetch_swap_transaction(user_id, swap_transaction_id);
  }

  public async getSwapTransactions(user_id: string) {
    return this.get_swap_transactions(user_id);
  }
}

export default Swap;
