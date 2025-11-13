import User from './features/user';
import Wallets from './features/wallets';
import Market from './features/market';
import Orders from './features/orders';
import Withdrawals from './features/withdrawals';
import Deposits from './features/deposits';
import Swap from './features/swap';
import Address from './features/address';
import Beneficiaries from './features/beneficiaries';
import Fees from './features/fees';

class Quidax {
  user: User;

  wallets: Wallets;

  market: Market;

  orders: Orders;

  withdrawals: Withdrawals;

  deposits: Deposits;

  swap: Swap;

  address: Address;

  beneficiaries: Beneficiaries;

  fees: Fees;

  constructor(public api_key: string) {
    this.user = new User(this.api_key);
    this.wallets = new Wallets(this.api_key);
    this.market = new Market(this.api_key);
    this.orders = new Orders(this.api_key);
    this.withdrawals = new Withdrawals(this.api_key);
    this.deposits = new Deposits(this.api_key);
    this.swap = new Swap(this.api_key);
    this.address = new Address(this.api_key);
    this.beneficiaries = new Beneficiaries(this.api_key);
    this.fees = new Fees(this.api_key);
  }
}
export default Quidax;

// testing
