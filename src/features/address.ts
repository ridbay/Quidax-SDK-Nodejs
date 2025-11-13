import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';

class Address {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async validate_address(currency: string, address: string, network?: string): Promise<any> {
    try {
      const params = new URLSearchParams({ currency, address });
      if (network) params.append('network', network);
      const response = await this.client.get(`${this.base_url}/wallets/validate_address?${params.toString()}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async validateAddress(currency: string, address: string, network?: string): Promise<any> {
    return this.validate_address(currency, address, network);
  }
}

export default Address;
