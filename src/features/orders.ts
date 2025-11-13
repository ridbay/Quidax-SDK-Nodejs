import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
// import type { QuidaxApiEnvelope, InstantOrder } from '../types/api';

/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Orders {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async create_order(
    user_id: string,
    market: string,
    side: 'buy' | 'sell',
    ord_type: 'limit' | 'market',
    price: string,
    volume: string,
  ): Promise<any> {
    const body = {
      market,
      side,
      ord_type,
      price,
      volume,
    };
    try {
      const response = await this.client.post(`${this.base_url}/users/${user_id}/orders`, body);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createOrder(
    user_id: string,
    market: string,
    side: 'buy' | 'sell',
    ord_type: 'limit' | 'market',
    price: string,
    volume: string,
  ): Promise<any> {
    return this.create_order(user_id, market, side, ord_type, price, volume);
  }

  public async create_instant_order(user_id: string, currency: string, volume: number): Promise<any> {
    const body = {
      bid: 'ngn', // Sell into naira
      ask: `${currency}`, // Currency to sell
      type: 'sell',
      volume: `${volume}`, // How much to sell, e.g 0.5btc
      unit: `${currency}`, // The order will be estimated using btc
    };
    try {
      const response = await this.client.post(`${this.base_url}/users/${user_id}/instant_orders`, body);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createInstantOrder(user_id: string, currency: string, volume: number): Promise<any> {
    return this.create_instant_order(user_id, currency, volume);
  }

  public async create_instant_order_usdt(user_id: string, currency: string, volume: number): Promise<any> {
    const body = {
      bid: 'usdt', // Sell into USDT
      ask: `${currency}`, // Currency to sell
      type: 'sell',
      volume: `${volume}`, // How much to sell, e.g 0.5btc
      unit: `${currency}`, // The order will be estimated using btc
    };
    try {
      const response = await this.client.post(`${this.base_url}/users/${user_id}/instant_orders`, body);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async confirm_instant_order(user_id: string, instant_order_id: string): Promise<any> {
    try {
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/instant_orders/${instant_order_id}/confirm`,
        null,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async confirmInstantOrder(user_id: string, instant_order_id: string): Promise<any> {
    return this.confirm_instant_order(user_id, instant_order_id);
  }

  public async fetch_instant_order(user_id: string, instant_order_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/instant_orders/${instant_order_id}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchInstantOrder(user_id: string, instant_order_id: string): Promise<any> {
    return this.fetch_instant_order(user_id, instant_order_id);
  }

  public async fetch_instant_orders_by_currency(user_id: string, currency: string): Promise<any> {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/instant_orders?market=${currency}ngn&state=done&order_by=desc`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchInstantOrdersByCurrency(user_id: string, currency: string): Promise<any> {
    return this.fetch_instant_orders_by_currency(user_id, currency);
  }

  // New additions
  public async fetch_orders(
    user_id: string,
    params?: { market?: string; state?: string; order_by?: 'asc' | 'desc'; page?: number; per_page?: number },
  ): Promise<any> {
    try {
      const qs = new URLSearchParams();
      if (params?.market) qs.append('market', params.market);
      if (params?.state) qs.append('state', params.state);
      if (params?.order_by) qs.append('order_by', params.order_by);
      if (params?.per_page) qs.append('per_page', String(params.per_page));
      if (params?.page) qs.append('page', String(params.page));
      if (!params?.order_by) qs.append('order_by', 'desc');
      const url = `${this.base_url}/users/${user_id}/orders${qs.toString() ? `?${qs.toString()}` : ''}`;
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchOrders(
    user_id: string,
    params?: { market?: string; state?: string; order_by?: 'asc' | 'desc'; page?: number; per_page?: number },
  ): Promise<any> {
    return this.fetch_orders(user_id, params);
  }

  public async fetch_order(user_id: string, order_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/orders/${order_id}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchOrder(user_id: string, order_id: string): Promise<any> {
    return this.fetch_order(user_id, order_id);
  }

  public async cancel_order(user_id: string, order_id: string): Promise<any> {
    try {
      const response = await this.client.post(`${this.base_url}/users/${user_id}/orders/${order_id}/cancel`, null);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async cancelOrder(user_id: string, order_id: string): Promise<any> {
    return this.cancel_order(user_id, order_id);
  }

  public async fetch_instant_orders(
    user_id: string,
    params?: { market?: string; state?: string; order_by?: 'asc' | 'desc'; page?: number; per_page?: number },
  ): Promise<any> {
    try {
      const qs = new URLSearchParams();
      if (params?.market) qs.append('market', params.market);
      if (params?.state) qs.append('state', params.state);
      if (params?.order_by) qs.append('order_by', params.order_by);
      if (params?.per_page) qs.append('per_page', String(params.per_page));
      if (params?.page) qs.append('page', String(params.page));
      if (!params?.order_by) qs.append('order_by', 'desc');
      const url = `${this.base_url}/users/${user_id}/instant_orders${qs.toString() ? `?${qs.toString()}` : ''}`;
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchInstantOrders(
    user_id: string,
    params?: { market?: string; state?: string; order_by?: 'asc' | 'desc'; page?: number; per_page?: number },
  ): Promise<any> {
    return this.fetch_instant_orders(user_id, params);
  }
}

export default Orders;
