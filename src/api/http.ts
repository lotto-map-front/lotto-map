import axios, { AxiosRequestConfig } from 'axios';
import { AXIOS_BASE_URL, AXIOS_DEFAULT_TIMEOUT } from '@/constants/AxiosConfig';

const BASE_URL = AXIOS_BASE_URL;
const DEFAULT_TIMEOUT = AXIOS_DEFAULT_TIMEOUT;

const createAxiosInstance = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    ...config,
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return axiosInstance;
};

const axiosRequest = createAxiosInstance();

export const axiosRequestHandler = async <T>(method: RequestMethod, url: string, body?: T) => {
  const response = await axiosRequest[method](url, body || {});
  return response.data;
};
