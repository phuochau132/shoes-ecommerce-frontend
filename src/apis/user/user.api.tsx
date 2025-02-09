import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { UserType, WishlistDetailType, WishlistType } from '@/types/user';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getInfo: builder.mutation<{ data: UserType }, void>({
      query: () => ({
        url: `/user/info`,
        showToast: false,
        method: 'GET'
      })
    }),
    updateProfile: builder.mutation<any, any>({
      query: (Payload) => ({
        url: `/user/update-profile`,
        method: 'PUT',
        data: {
          ...Payload
        }
      })
    }),
    addWishlist: builder.mutation<{ data: { wishlists: WishlistType[] } }, { product_id: number }>({
      query: (Payload) => ({
        url: `/user/wishlist/add`,
        method: 'Post',
        data: {
          ...Payload
        }
      })
    }),
    removeWishlist: builder.mutation<{ data: { wishlists: WishlistType[] } }, { id: number }>({
      query: (Payload) => ({
        url: `/user/wishlist/remove/${Payload.id}`,
        method: 'Delete'
      })
    }),
    getWishlists: builder.mutation<{ data: WishlistDetailType[] }, void>({
      query: () => ({
        url: `/user/wishlist`,
        showToast: false,
        method: 'GET'
      })
    }),
    sendmail: builder.mutation<void, { name: string; email: string; message: string }>({
      query: (payload) => ({
        url: `/mail/send`,
        method: 'POST',
        data: payload
      })
    })
  })
});

export const {
  useGetInfoMutation,
  useUpdateProfileMutation,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useGetWishlistsMutation,
  useSendmailMutation
} = UserApi;
export default UserApi;
