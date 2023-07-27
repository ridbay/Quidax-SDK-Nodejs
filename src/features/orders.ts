import axios from 'axios';

/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Withdrawals {
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

  public async create_instant_order(user_id: string, currency: string, volume: number) {
    const body = {
      bid: 'ngn', // Sell into naira
      ask: `${currency}`, // Currency to sell
      type: 'sell',
      volume: `${volume}`, // How much to sell, e.g 0.5btc
      unit: `${currency}`, // The order will be estimated using btc
    };
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders`,
        body,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async confirm_instant_order(user_id: string, instant_order_id: string) {
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders/${instant_order_id}/confirm`,
        null,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_instant_order(user_id: string, instant_order_id: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders/${instant_order_id}`,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default Withdrawals;
