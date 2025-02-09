import axios, { AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { isTokenExpired } from '@/utils/helpers/jwt';

type AxiosBaseQueryError = {
  status?: number;
  data?: any;
};
export interface CustomizeAxiosRequestConfig extends AxiosRequestConfig {
  showToast?: boolean;
}

export const baseURL = import.meta.env.VITE_SERVER_NAME + '/api/v1';
axios.defaults.withCredentials = true;

const requestQueue: (() => Promise<any>)[] = [];
let isProcessing = false;

/**
 * Processes the request queue sequentially to avoid race conditions
 */

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  while (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift();

    if (nextRequest) {
      await nextRequest();
    }
  }
  isProcessing = false;
};

/**
 * Custom Axios query function for RTK Query
 * This function queues requests and ensures authentication token validity
 * @param requestConfig - Configuration for the Axios request
 * @returns A promise resolving to the API response or an error object
 */
const axiosBaseQuery: BaseQueryFn<CustomizeAxiosRequestConfig, unknown, AxiosBaseQueryError> = async (
  requestConfig
) => {
  return new Promise((resolve) => {
    requestQueue.push(async () => {
      await refreshToken();
      try {
        const accessToken = Cookies.get('access_token');
        const result = await axios({
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          url: baseURL + requestConfig.url,
          method: requestConfig.method,
          data: requestConfig.data
        });
        if (requestConfig.showToast !== false) {
          toast.success(result.data.message || 'Request successful');
        }
        // @ts-ignore
        resolve({ data: result.data, status: result.statusText });
      } catch (error) {
        const err = error as any;
        const errorMessage = err.response?.data?.message || 'An unknown error occurred';
        toast.error(errorMessage);
        resolve({
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message
          }
        });
      }
    });
    processQueue();
  });
};

/**
 * Refreshes the authentication token if it is expired
 */

const refreshToken = async () => {
  const accessToken = Cookies.get('access_token');
  if (accessToken && isTokenExpired(accessToken)) {
    try {
      const refreshResponse = await axios.post(`${baseURL}/auth/refresh-token`);
      const newAccessToken = refreshResponse.data.data.token;
      Cookies.set('access_token', newAccessToken, { expires: 1 });
    } catch (refreshError) {
      toast.error('Session expired. Please log in again.');
    }
  }
};

export { axiosBaseQuery };
