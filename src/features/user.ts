import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';
// import type { QuidaxApiEnvelope, SubAccount } from '../types/api';
/**
 * @class User
 * @param {string} apiKey - The public key of the merchant
 */
class User {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async create_subAccount(
    email: string,
    firstname: string,
    lastname: string,
    phone_number: string,
  ): Promise<any> {
    const body = {
      email,
      firstname,
      lastname,
      phone_number,
    };
    try {
      const response = await this.client.post(`${this.base_url}/users`, body);
      const { data } = response;
      // eslint-disable-next-line eqeqeq
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createSubAccount(
    email: string,
    firstname: string,
    lastname: string,
    phone_number: string,
  ): Promise<any> {
    return this.create_subAccount(email, firstname, lastname, phone_number);
  }

  public async fetch_single_subAccount(email: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/user/email?user_id=${email}`);
      const { data } = response;
      // eslint-disable-next-line eqeqeq
      if (data?.response?.status > 300) {
        throw Error(data);
      }

      return data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchSingleSubAccount(email: string): Promise<any> {
    return this.fetch_single_subAccount(email);
  }

  public async fetch_all_subAccounts(): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchAllSubAccounts(): Promise<any> {
    return this.fetch_all_subAccounts();
  }

  // New additions
  public async edit_subAccount(
    user_id: string,
    payload: { firstname?: string; lastname?: string; phone_number?: string },
  ): Promise<any> {
    try {
      const response = await this.client.put(`${this.base_url}/users/${user_id}`, payload);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async editSubAccount(
    user_id: string,
    payload: { firstname?: string; lastname?: string; phone_number?: string },
  ): Promise<any> {
    return this.edit_subAccount(user_id, payload);
  }

  public async fetch_parent_account(): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/me`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchParentAccount(): Promise<any> {
    return this.fetch_parent_account();
  }

  public async fetch_subAccount(user_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchSubAccount(user_id: string): Promise<any> {
    return this.fetch_subAccount(user_id);
  }
}

export default User;
