import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { UserType } from '@/types/user';
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
    })
  })
});

export const { useGetInfoMutation, useUpdateProfileMutation } = UserApi;
export default UserApi;
