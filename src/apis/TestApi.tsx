import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../base/BaseQuery';

const TestAPi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    product: builder.query({
      query: () => ({
        url: `/product`,
        method: 'GET'
      })
    }),
    delProduct: builder.mutation({
      query: (id: Number) => ({
        url: `/product`,
        method: 'Delete',
        data: {
          id
        }
      })
    })
  })
});

export const { useProductQuery, useDelProductMutation } = TestAPi;
export default TestAPi;
