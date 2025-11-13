import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
// import type { QuidaxApiEnvelope } from '../types/api';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class Withdrawals {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async create_a_withdrawal_to_merchant(
    amount: string,
    user_id: string,
    merchant_id: string,
  ): Promise<any> {
    const currency = 'ngn';

    try {
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/withdraws/?currency=${currency}&amount=${amount}&fund_uid=${merchant_id}`,
        null,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createAWithdrawalToMerchant(
    amount: string,
    user_id: string,
    merchant_id: string,
  ): Promise<any> {
    return this.create_a_withdrawal_to_merchant(amount, user_id, merchant_id);
  }

  // General withdrawals
  public async create_withdrawal(
    user_id: string,
    currency: string,
    amount: string,
    address?: string,
    network?: string,
    memoOrTag?: string,
  ): Promise<any> {
    try {
      const params = new URLSearchParams({ currency, amount });
      if (address) params.append('fund_uid', address);
      if (network) params.append('network', network);
      if (memoOrTag) params.append('memo', memoOrTag);
      const url = `${this.base_url}/users/${user_id}/withdraws/?${params.toString()}`;
      const response = await this.client.post(url, null);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createWithdrawal(
    user_id: string,
    currency: string,
    amount: string,
    address?: string,
    network?: string,
    memoOrTag?: string,
  ): Promise<any> {
    return this.create_withdrawal(user_id, currency, amount, address, network, memoOrTag);
  }

  public async fetch_withdrawals(
    user_id: string,
    params?: { state?: string; page?: number; per_page?: number },
  ): Promise<any> {
    try {
      const qs = new URLSearchParams();
      if (params?.state) qs.append('state', params.state);
      if (params?.per_page) qs.append('per_page', String(params.per_page));
      if (params?.page) qs.append('page', String(params.page));
      qs.append('order_by', 'desc');
      const url = `${this.base_url}/users/${user_id}/withdraws${qs.toString() ? `?${qs.toString()}` : ''}`;
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchWithdrawals(
    user_id: string,
    params?: { state?: string; page?: number; per_page?: number },
  ): Promise<any> {
    return this.fetch_withdrawals(user_id, params);
  }

  public async fetch_withdrawal(user_id: string, withdrawal_id: string): Promise<any> {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/withdraws/${withdrawal_id}`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchWithdrawal(user_id: string, withdrawal_id: string): Promise<any> {
    return this.fetch_withdrawal(user_id, withdrawal_id);
  }

  public async cancel_withdrawal(user_id: string, withdrawal_id: string): Promise<any> {
    try {
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/withdraws/${withdrawal_id}/cancel`,
        null,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async cancelWithdrawal(user_id: string, withdrawal_id: string): Promise<any> {
    return this.cancel_withdrawal(user_id, withdrawal_id);
  }

  public async fetch_withdraw_by_reference(user_id: string, reference: string): Promise<any> {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/withdraws/by_reference?reference=${encodeURIComponent(reference)}`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchWithdrawByReference(user_id: string, reference: string): Promise<any> {
    return this.fetch_withdraw_by_reference(user_id, reference);
  }
}

export default Withdrawals;
