import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const baseUrl = '/products';
const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getProductsByIds: builder.mutation<any, { ids: number }>({
      query: (payload) => ({
        url: `${baseUrl}/`,
        method: 'Post',
        data: {
          ids: payload.ids
        }
      })
    }),
    getProduct: builder.mutation<any, { handle: string }>({
      query: (payload) => ({
        url: `${baseUrl}/${payload.handle}`,
        method: 'GET',
        showToast: false
      })
    }),
    addReview: builder.mutation<any, { handle: string; data: any }>({
      query: ({ handle, data }) => ({
        url: `${baseUrl}/${handle}/review/add`,
        method: 'POST',
        data
      })
    }),
    removeReview: builder.mutation<any, { handle: string; data: any }>({
      query: ({ handle, data }) => ({
        url: `${baseUrl}/${handle}/review/remove`,
        method: 'POST',
        data
      })
    })
  })
});

export const { useGetProductMutation, useAddReviewMutation, useRemoveReviewMutation } = ProductApi;
export default ProductApi;
