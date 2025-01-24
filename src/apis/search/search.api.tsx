import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
const baseUrl = '/search/suggest';
const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    filterProducts: builder.mutation<any, { query: string }>({
      query: (payload) => ({
        url: `${baseUrl}?q=${payload.query}`,
        method: 'Get',
        showToast: false
      })
    })
  })
});

export const { useFilterProductsMutation } = searchApi;
export default searchApi;
