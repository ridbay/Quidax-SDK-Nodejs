import axios from 'axios';
import CustomError from '../util/errors';
import { NetworkType } from '../enums';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */

class Wallets {
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

  public async create_payment_address(user_id: string, currency: string, network: NetworkType) {
    try {
      // const url = `${this.base_url}/users/${user_id}/wallets/${currency}/addresses?network=${network}`;
      let url;
      // if (currency === 'usdt') {
      //   url = `${this.base_url}/users/${user_id}/wallets/${currency}/addresses?network=${network}`;
      // } else {
      //   url = `${this.base_url}/users/${user_id}/wallets/${currency}/addresses`;
      // }
      if (network === 'none') {
        url = `${this.base_url}/users/${user_id}/wallets/${currency}/addresses`;
      } else {
        url = `${this.base_url}/users/${user_id}/wallets/${currency}/addresses?network=${network}`;
      }

      const response = await axios.post(url, null, this.options);

      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_payment_address(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/address`, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_payment_addresses(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/addresses`, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_user_wallet(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}`, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetch_all_user_wallets(user_id: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets`, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Wallets;
