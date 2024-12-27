import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { UserLoginDto, UserRegisterDto, UserType } from '@/types/user';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<any, UserRegisterDto>({
      query: (payload) => ({
        url: `/auth/register`,
        method: 'POST',
        data: {
          ...payload
        }
      })
    }),
    login: builder.mutation<any, UserLoginDto>({
      query: (Payload) => ({
        url: `/auth/login`,
        method: 'POST',
        data: {
          ...Payload
        }
      })
    }),
    getInfo: builder.mutation<{ data: UserType }, void>({
      query: () => ({
        url: `/auth/info`,
        showToast: false,
        method: 'GET'
      })
    }),
    updateProfile: builder.mutation<any, any>({
      query: (Payload) => ({
        url: `/auth/update-profile`,
        method: 'PUT',
        data: {
          ...Payload
        }
      })
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (Payload) => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        showToast: false,
        data: {
          ...Payload
        }
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useGetInfoMutation,
  useUpdateProfileMutation
} = AuthApi;
export default AuthApi;
