import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import { NetworkType } from '../enums';
import createHttpClient from '../util/http';
// import type { QuidaxApiEnvelope, WalletAddress } from '../types/api';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */

class Wallets {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async create_payment_address(
    user_id: string,
    currency: string,
    network: NetworkType,
  ): Promise<any> {
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

      const response = await this.client.post(url, null);

      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createPaymentAddress(
    user_id: string,
    currency: string,
    network: NetworkType,
  ): Promise<any> {
    return this.create_payment_address(user_id, currency, network);
  }

  public async fetch_payment_address(
    user_id: string,
    currency: string,
  ): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/wallets/${currency}/address`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchPaymentAddress(
    user_id: string,
    currency: string,
  ): Promise<any> {
    return this.fetch_payment_address(user_id, currency);
  }

  public async fetch_payment_addresses(
    user_id: string,
    currency: string,
  ): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/wallets/${currency}/addresses`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchPaymentAddresses(
    user_id: string,
    currency: string,
  ): Promise<any> {
    return this.fetch_payment_addresses(user_id, currency);
  }

  public async fetch_user_wallet(
    user_id: string,
    currency: string,
  ): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/wallets/${currency}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchUserWallet(
    user_id: string,
    currency: string,
  ): Promise<any> {
    return this.fetch_user_wallet(user_id, currency);
  }

  public async fetch_all_user_wallets(user_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/wallets`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchAllUserWallets(user_id: string): Promise<any> {
    return this.fetch_all_user_wallets(user_id);
  }

  // New additions
  public async fetch_payment_address_by_id(
    user_id: string,
    currency: string,
    address_id: string,
  ): Promise<any> {
    try {
      const response = await this.client.get(
        `${this.base_url}/users/${user_id}/wallets/${currency}/addresses/${address_id}`,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchPaymentAddressById(
    user_id: string,
    currency: string,
    address_id: string,
  ): Promise<any> {
    return this.fetch_payment_address_by_id(user_id, currency, address_id);
  }

  public async reenque_generated_wallet_address(
    user_id: string,
    currency: string,
    address_id: string,
  ): Promise<any> {
    try {
      // The docs spell this as "re-enque"; using snake_case path suffix `re_enque`.
      const response = await this.client.post(
        `${this.base_url}/users/${user_id}/wallets/${currency}/addresses/${address_id}/re_enque`,
        null,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async reEnqueGeneratedWalletAddress(
    user_id: string,
    currency: string,
    address_id: string,
  ): Promise<any> {
    return this.reenque_generated_wallet_address(user_id, currency, address_id);
  }
}

export default Wallets;
