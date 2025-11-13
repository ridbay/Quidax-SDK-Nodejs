// import util from "util"
interface BaseErrorOptions {
  message?: string;
  status?: any;
  code?: any;
}
class BaseError extends Error {
  status: any;

  code: any;

  constructor({ message, status, code }: BaseErrorOptions = {}) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BaseError;
