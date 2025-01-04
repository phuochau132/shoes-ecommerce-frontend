import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { UserType, WishlistDetailType } from '@/types/user';
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
    addWishlist: builder.mutation<any, any>({
      query: (Payload) => ({
        url: `/user/wishlist/add`,
        method: 'Post',
        data: {
          ...Payload
        }
      })
    }),
    removeWishlist: builder.mutation<any, { id: number }>({
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
    })
  })
});

export const {
  useGetInfoMutation,
  useUpdateProfileMutation,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useGetWishlistsMutation
} = UserApi;
export default UserApi;
