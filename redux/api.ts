import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(API_URL, "api-url");

export const collabapi = createApi({
  reducerPath: "collabapi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getExplorePost: builder.query({
      query: () => `/get-explore`,
    }),
    getYourPost: builder.query({
      query: (email: string) => {
        return {
          url: `/get-your-post`,
          params: {
            email,
          },
        };
      },
    }),
  }),
});

export const { useGetExplorePostQuery, useGetYourPostQuery } = collabapi;
