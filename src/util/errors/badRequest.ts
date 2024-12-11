import BaseError from './baseError';

interface BadRequestErrorOptions {
  message?: string;
  status?: number;
  code?: string;
}

class BadRequestError extends BaseError {
  constructor({ message, status, code }: BadRequestErrorOptions = {}) {
    super({ message, status, code });
    this.name = this.constructor.name;
  }
}

export default BadRequestError;
