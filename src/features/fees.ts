import type { AxiosInstance } from 'axios';
import CustomError from '../util/errors';
import createHttpClient from '../util/http';

class Fees {
  public base_url: string;

  private client: AxiosInstance;

  constructor(public api_key: string) {
    this.base_url = 'https://app.quidax.io/api/v1';
    this.client = createHttpClient(this.api_key);
  }

  public async get_crypto_withdrawal_fees(currency: string, network?: string): Promise<any> {
    try {
      const params = new URLSearchParams({ currency });
      if (network) params.append('network', network);
      const response = await this.client.get(`${this.base_url}/fees/crypto_withdrawal?${params.toString()}`);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }

  public async getCryptoWithdrawalFees(currency: string, network?: string): Promise<any> {
    return this.get_crypto_withdrawal_fees(currency, network);
  }
}

export default Fees;
