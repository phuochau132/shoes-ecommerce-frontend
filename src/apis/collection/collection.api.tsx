import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/base/BaseQuery';
import { CollectionType } from '@/types/collection';
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
    }),
    getAll: builder.mutation<{ data: { collections: CollectionType[] } }, void>({
      query: () => ({
        url: `${baseUrl}/`,
        method: 'Get',
        showToast: false
      })
    })
  })
});

export const { useGetCollectionMutation, useGetAllMutation } = CollectionApi;
export default CollectionApi;
