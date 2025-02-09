import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const baseUrl = '/order';
const OrderApi = createApi({
  reducerPath: 'OrderApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getOrder: builder.mutation({
      query: () => ({
        url: `${baseUrl}/`,
        showToast: false,
        method: 'GET'
      })
    }),
    createOrder: builder.mutation<any, any>({
      query: (Payload) => ({
        url: `${baseUrl}/create`,
        method: 'POST',
        data: {
          ...Payload
        }
      })
    })
  })
});

export const { useCreateOrderMutation, useGetOrderMutation } = OrderApi;
export default OrderApi;
