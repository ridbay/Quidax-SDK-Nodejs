import BadRequestError from './badRequest';
import UnauthorizedError from './unAuthorized';
import ServerError from './serverError';

class CustomError {
  /**
   *
   * @param {object} error - The error object
   * @returns {Object} - The an error instance
   * @memberof CustomError
   */
  static processError(error: any) {
    console.log({ package_error: error });
    console.log({ error_response_data_message: error?.response?.data?.message });
    console.log({ error_response_data_data_message: error?.response?.data?.data?.message });
    console.log({ error_message: error.message });
    console.log({ error_response_status: error.response.status });
    console.log({ error_response_data_status: error.response.data.status });
    switch (error.response.status) {
      case 400:
        throw new BadRequestError({
          message: error?.response?.data?.message || error?.response?.data?.data?.message || error.message,
          status: error.response.data.status,
        });
      case 401:
        throw new UnauthorizedError({
          message: error?.response?.data?.message || error?.response?.data?.data?.message || error.message,
          status: error.response.data.status,
        });
      // case 404:
      //   throw new NotFoundError({ message: error.response.data.message, status: error.response.data.status })
      default:
        throw new ServerError({
          message: error?.response?.data?.message || error?.response?.data?.data?.message || error.message,
          status: error.response.data.status,
        });
    }
  }
}

export default CustomError;
