import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://app.quidax.io/api/v1';

export function createClient(apiKey: string, overrides?: Partial<{ timeout: number }>): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: overrides?.timeout ?? 15000,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Client-Version': 'quidax-package/1.x',
    },
  });

  // Response pass-through; feature layers handle error normalization via CustomError
  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err),
  );

  return instance;
}

export default createClient;
