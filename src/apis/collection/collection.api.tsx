import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
export type ErrorType = {
  error: {
    status: number;
    data: any;
  };
};
const baseUrl = '/collections';
const CollectionApi = createApi({
  reducerPath: 'CollectionApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCollection: builder.mutation<any, { handle: string; query?: string }>({
      query: (payload) => ({
        url: `${baseUrl}/${payload.handle}?${payload.query}`,
        method: 'Get',
        showToast: false
      })
    })
  })
});

export const { useGetCollectionMutation } = CollectionApi;
export default CollectionApi;
