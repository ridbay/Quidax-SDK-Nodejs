import BaseError from './baseError';

interface ServerErrorOptions {
  message?: string;
  status?: any;
  code?: any;
}

class ServerError extends BaseError {
  constructor({ message, status, code }: ServerErrorOptions = {}) {
    super({ message, status, code });
    this.name = this.constructor.name;
  }
}

export default ServerError;
