import axios from 'axios';
import CustomError from '../util/errors';
/**

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

  public async fetch_single_subAccount(email: string) {
    try {
      const response = await axios.get(`${this.base_url}/user/email?user_id=${email}`, this.options);
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

  public async fetch_all_subAccounts() {
    try {
      const response = await axios.get(`${this.base_url}/users`, this.options);
      return response.data;
    } catch (error) {
      CustomError.processError(error);
    }
  }
}

export default User;
