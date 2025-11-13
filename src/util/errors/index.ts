import BadRequestError from './badRequest';
import UnauthorizedError from './unAuthorized';
import ServerError from './serverError';

class CustomError {
  /**
   * Normalize and throw a typed error. Never returns.
   * @param {object} error - The error object
   * @returns {never}
   */
  static processError(error: any): any {
    // If error lacks a structured response, throw a generic server error
    if (!error || !error.response) {
      throw new ServerError({ message: error?.message || 'Unknown error', status: 'error', code: 500 });
    }
    const throwError = (ErrorClass: any): any => {
      throw new ErrorClass({
        message: error?.response?.data?.message || error?.response?.data?.data?.message || error.message,
        status: error.response.data.status,
        code: error.response.status,
      });
    };
    const statusCode = error.response.status;
    if (statusCode === 400) {
      throwError(BadRequestError);
    } else if (statusCode === 401) {
      throwError(UnauthorizedError);
    }
    // default
    throwError(ServerError);
  }
}

export default CustomError;
