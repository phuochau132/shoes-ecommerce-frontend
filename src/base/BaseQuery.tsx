import axios, { AxiosRequestConfig, AxiosError } from 'axios';
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

const baseURL = import.meta.env.VITE_SERVER_NAME + '/api/v1';
axios.defaults.withCredentials = true;

const axiosBaseQuery: BaseQueryFn<CustomizeAxiosRequestConfig, unknown, AxiosBaseQueryError> = async ({
  url,
  method,
  data,
  showToast = true
}) => {
  await refreshToken();
  try {
    const accessToken = Cookies.get('access_token');

    const result = await axios({
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      url: baseURL + url,
      method,
      data
    });

    if (showToast) {
      toast.success(result.data.message || 'Request successful');
    }

    return { data: result.data, status: result.statusText };
  } catch (error) {
    const err = error as any;
    const errorMessage = err.response?.data?.message || 'An unknown error occurred';
    toast.error(errorMessage);
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message
      }
    };
  }
};

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
