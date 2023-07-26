import User from './user';
import Wallets from './wallets';

class Quidax {
  user: User;
  wallets: Wallets;

  constructor(public api_key: string) {
    this.user = new User(this.api_key);
    this.wallets = new Wallets(this.api_key);
  }
}
export default Quidax;
