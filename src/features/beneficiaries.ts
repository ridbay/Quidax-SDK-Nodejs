import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';

class Beneficiaries {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async fetch_beneficiaries(user_id: string, params?: { page?: number; per_page?: number }): Promise<any> {
    try {
      const qs = new URLSearchParams();
      if (params?.per_page) qs.append('per_page', String(params.per_page));
      if (params?.page) qs.append('page', String(params.page));
      const url = `${this.base_url}/users/${user_id}/beneficiaries${qs.toString() ? `?${qs.toString()}` : ''}`;
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchBeneficiaries(user_id: string, params?: { page?: number; per_page?: number }): Promise<any> {
    return this.fetch_beneficiaries(user_id, params);
  }

  public async create_beneficiary(user_id: string, payload: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.post(`${this.base_url}/users/${user_id}/beneficiaries`, payload);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async createBeneficiary(user_id: string, payload: Record<string, any>): Promise<any> {
    return this.create_beneficiary(user_id, payload);
  }

  public async fetch_beneficiary(user_id: string, beneficiary_id: string): Promise<any> {
    try {
      const response = await this.client.get(`${this.base_url}/users/${user_id}/beneficiaries/${beneficiary_id}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async fetchBeneficiary(user_id: string, beneficiary_id: string): Promise<any> {
    return this.fetch_beneficiary(user_id, beneficiary_id);
  }

  public async edit_beneficiary(user_id: string, beneficiary_id: string, payload: Record<string, any>): Promise<any> {
    try {
      const response = await this.client.put(
        `${this.base_url}/users/${user_id}/beneficiaries/${beneficiary_id}`,
        payload,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async editBeneficiary(user_id: string, beneficiary_id: string, payload: Record<string, any>): Promise<any> {
    return this.edit_beneficiary(user_id, beneficiary_id, payload);
  }
}

export default Beneficiaries;
