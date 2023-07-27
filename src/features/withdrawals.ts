import axios from 'axios';
import CustomError from '../util/errors';
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

  public async create_a_withdrawal_to_merchant(amount: string, user_id: string, merchant_id: string) {
    const currency = 'ngn';

    try {
      const response = await axios.post(
        `${this.base_url}/users/${user_id}/withdraws/?currency=${currency}&amount=${amount}&fund_uid=${merchant_id}`,
        null,
        this.options,
      );
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default Withdrawals;
