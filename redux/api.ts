import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    addYourPost: builder.mutation({
      query: (body: any) => {
        return {
          url: `/post`,
          method: "POST",
          body,
        };
      },
    }),
    deletePost: builder.mutation({
      query: (body: any) => {
        return {
          url: `/delete-post`,
          method: "POST",
          body,
        };
      },
    }),
    updatePost: builder.mutation({
      query: (body: any) => {
        return {
          url: `/update-post`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetExplorePostQuery,
  useGetYourPostQuery,
  useAddYourPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = collabapi;
