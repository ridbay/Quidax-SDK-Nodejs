import axios from 'axios';
import Quidax from './quidax';
/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
class User {
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

  public async create_subAccount(email: string, firstname: string, lastname: string, phone_number: string) {
    const body = {
      email,
      firstname,
      lastname,
      phone_number,
    };
    try {
      const response = await axios.post(`${this.base_url}/users`, body, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_all_subAccounts() {
    try {
      const response = await axios.get(`${this.base_url}/users`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default User;
