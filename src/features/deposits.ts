import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
import type { QuidaxApiEnvelope, DepositRecord } from '../types/api';

/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Deposits {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async fetch_single_deposit(user_id: string, deposit_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/deposits/${deposit_id}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchSingleDeposit(user_id: string, deposit_id: string): Promise<any> {
    return this.fetch_single_deposit(user_id, deposit_id);
  }

  public async fetch_all_deposit(
    user_id: string,
    currency: string,
    state: string,
    per_page?: string,
    page?: string,
  ): Promise<any> {
    try {
      const url = `${this.base_url}/users/${user_id}/deposits?currency=${currency}&state=${state}&order_by=desc${
        per_page && page ? `&per_page=${per_page}&page=${page}` : ''
      }`;
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchAllDeposit(
    user_id: string,
    currency: string,
    state: string,
    per_page?: string,
    page?: string,
  ): Promise<any> {
    return this.fetch_all_deposit(user_id, currency, state, per_page, page);
  }

  public async fetch_all_deposit_by_date(
    user_id: string,
    currency: string,
    state: string,
    per_page: string,
    // page: string,
    start_date: string,
    end_date: string,
  ): Promise<any> {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/deposits/all?currency=${currency}&state=${state}&start_date=${start_date}&end_date=${end_date}&per_page=${per_page}&order_by=desc`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchAllDepositByDate(
    user_id: string,
    currency: string,
    state: string,
    per_page: string,
    start_date: string,
    end_date: string,
  ): Promise<QuidaxApiEnvelope<DepositRecord[]>> {
    return this.fetch_all_deposit_by_date(user_id, currency, state, per_page, start_date, end_date);
  }
}

export default Deposits;
