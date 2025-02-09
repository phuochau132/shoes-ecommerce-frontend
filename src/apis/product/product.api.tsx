import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { ProductType } from '@/types/product';
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
    getProductsByIds: builder.mutation<any, { ids: string[] }>({
      query: (payload) => ({
        url: `${baseUrl}/`,
        method: 'Post',
        showToast: false,
        data: {
          ids: payload.ids
        }
      })
    }),
    getProduct: builder.query<{ data: { product: ProductType } }, { handle: string }>({
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

export const { useGetProductQuery, useAddReviewMutation, useRemoveReviewMutation, useGetProductsByIdsMutation } =
  ProductApi;
export default ProductApi;
