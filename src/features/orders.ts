import axios from 'axios';
import CustomError from '../util/errors';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Orders {
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

  public async create_order(
    user_id: string,
    market: string,
    side: 'buy' | 'sell',
    ord_type: 'limit' | 'market',
    price: string,
    volume: string,
  ) {
    const body = {
      market,
      side,
      ord_type,
      price,
      volume,
    };
    try {
      const response = await axios.post(`https://www.quidax.com/api/v1/users/${user_id}/orders`, body, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
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
      CustomError.processError(error);
    }
  }

  public async create_instant_order_usdt(user_id: string, currency: string, volume: number) {
    const body = {
      bid: 'usdt', // Sell into USDT
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
      CustomError.processError(error);
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
      CustomError.processError(error);
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
      CustomError.processError(error);
    }
  }

  public async fetch_instant_orders_by_currency(user_id: string, currency: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders?market=${currency}ngn&state=done&order_by=desc`,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Orders;
