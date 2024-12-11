import BaseError from './baseError';

interface UnauthorizedErrorOptions {
  message?: string;
  status?: number;
  code?: string;
}

class UnauthorizedError extends BaseError {
  constructor({ message, status, code }: UnauthorizedErrorOptions = {}) {
    super({ message, status, code });
    this.name = this.constructor.name;
  }
}

export default UnauthorizedError;
