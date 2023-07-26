import User from './user';
import Wallets from './wallets';
import { UserType, WalletsType } from './types';

class Quidax {
  user: UserType;
  wallets: WalletsType;

  constructor(public api_key: string) {
    this.user = new User(this.api_key);
    this.wallets = new Wallets(this.api_key);
  }
}
export default Quidax;
