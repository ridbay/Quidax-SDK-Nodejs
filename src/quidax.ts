import axios from 'axios';

/**
 * The quidax module for handling all quidax related operations.
 * @class Quidax
 * @param {string} api_key - The public key of the merchant
 * @param {string} merchant_id - The id of the merchant
 */
export class Quidax {
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

    // axios
    //   .post(`${this.base_url}/users`, body, this.options)
    //   .then((response) => return response.data))
    //   .catch((err) => {
    //     if (err) {
    //       console.dir(err.data);
    //       return err);
    //     }
    //
    //
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

  public async create_payment_address(user_id: string, currency: string, network: string) {
    const endpoint = `https://live.pandar.ng/pd/v3/crypto/create/account/redem/${user_id}/${currency}/${network}`;

    try {
      const response = await axios.post(endpoint);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_payment_address(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/address`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_payment_addresses(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}/addresses`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_user_wallet(user_id: string, currency: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets/${currency}`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_all_user_wallets(user_id: string) {
    try {
      const response = await axios.get(`${this.base_url}/users/${user_id}/wallets`, this.options);
      return response.data;
    } catch (error) {
      return error;
    }
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
      return error;
    }
  }

  public async create_instant_order(user_id: string, currency: string, volume: number) {
    const body = {
      bid: 'ngn', // Sell into naira
      ask: `${currency}`, // Currency to sell
      type: 'sell',
      volume: `${volume}`, // How much to sell, e.g 0.5btc
      unit: `${currency}`, // The order will be estimated using btc
    };
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders`,
        body,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async confirm_instant_order(user_id: string, instant_order_id: string) {
    try {
      const response = await axios.post(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders/${instant_order_id}/confirm`,
        null,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_instant_order(user_id: string, instant_order_id: string) {
    try {
      const response = await axios.get(
        `https://www.quidax.com/api/v1/users/${user_id}/instant_orders/${instant_order_id}`,
        this.options,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async fetch_market_tickers() {
    try {
      const response = await axios.get(`${this.base_url}/markets/tickers`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
// export default Quidax;
