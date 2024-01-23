// import bills from './bills';

export enum StatusCodes {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  BadGateway = 522,
}

export type NetworkType = 'btc' | 'bep20' | 'erc20' | 'trc20' | 'doge' | 'none';
