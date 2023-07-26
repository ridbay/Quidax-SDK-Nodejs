import axios from 'axios';
import Quidax from './quidax';
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

  public async fetch_payment_address(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/address`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_payment_addresses(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/addresses`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_user_wallet(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default Wallets;
