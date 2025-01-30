import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { UserType } from '@/types/user';
import { CartType } from '@/types/cart';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const baseUrl = '/cart';
const CartApi = createApi({
  reducerPath: 'CartApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    add: builder.mutation<{ data: UserType }, { data: { productId: number; variantId?: number; quantity: number } }>({
      query: (payload) => ({
        url: `${baseUrl}/add`,
        method: 'Post',
        data: payload.data
      })
    }),
    getCart: builder.mutation({
      query: () => ({
        url: `${baseUrl}/`,
        method: 'Get',
        showToast: false
      })
    }),
    removeItem: builder.mutation<{ data: CartType }, { id: number }>({
      query: (payload) => ({
        url: `${baseUrl}/remove/${payload.id}`,
        method: 'Delete'
      })
    }),
    updateItem: builder.mutation<{ data: CartType }, { id: number; quantity: number; itemId: number }>({
      query: (payload) => ({
        url: `${baseUrl}/update/${payload.id}`,
        method: 'Put',
        data: {
          quantity: payload.quantity,
          itemId: payload.itemId
        }
      })
    })
  })
});

export const { useAddMutation, useGetCartMutation, useRemoveItemMutation, useUpdateItemMutation } = CartApi;
export default CartApi;
