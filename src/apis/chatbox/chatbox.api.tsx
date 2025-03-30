import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ChatBoxApi = createApi({
  reducerPath: 'ChatBoxApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://openrouter.ai/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer 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`);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getResult: builder.mutation<any, { request: object }>({
      query: (payload) => ({
        url: `/chat/completions`,
        method: 'POST',
        body: payload.request
      })
    })
  })
});

export const { useGetResultMutation } = ChatBoxApi;
export default ChatBoxApi;
