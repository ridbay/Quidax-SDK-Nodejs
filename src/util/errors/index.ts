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
    // console.log({ package_error: error });
    // console.log({ error_response_data_message: error?.response?.data?.message }); // Address already generated for btc, network: bep20.
    // console.log({ error_response_data_data_message: error?.response?.data?.data?.message }); // Address already generated for btc, network: bep20.
    // console.log({ error_message: error.message }); // Request failed with status code 400
    // console.log({ error_response_status: error.response.status }); // 400
    // console.log({ error_response_data_status: error.response.data.status }); // error
    const throwError = (ErrorClass: any) => {
      throw new ErrorClass({
        message: error?.response?.data?.message || error?.response?.data?.data?.message || error.message,
        status: error.response.data.status,
        code: error.response.status,
      });
    };
    switch (error.response.status) {
      case 400:
        throwError(BadRequestError);
        break;
      case 401:
        throwError(UnauthorizedError);
        break;
      // case 404:
      //   throw new NotFoundError({ message: error.response.data.message, status: error.response.data.status })
      default:
        throwError(ServerError);
        break;
    }
  }
}

export default CustomError;
