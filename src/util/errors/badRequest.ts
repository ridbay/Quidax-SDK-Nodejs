import BaseError from './baseError';

class BadRequestError extends BaseError {
  constructor(options: any = {}) {
    super(options);
    this.name = this.constructor.name;
    this.message = options.message;
    this.status = options.status;
  }
}

export default BadRequestError;
