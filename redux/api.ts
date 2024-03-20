import { Post } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const updateCache = (post: Post, data: Post) => {
  post._id = data._id;
  post.loggedInEmail = data.loggedInEmail;
  post.name = data.name;
  post.email = data.email;
  post.__v = data.__v;
  post.headline = data.headline;
  post.image = data.image;
  post.description = data.description;
  post.socialLinks = data.socialLinks;
};

export const collabapi = createApi({
  reducerPath: "collabapi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getExplorePost: builder.query({
      query: ({}) => `/get-explore`,
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
      query: (body: Post) => {
        return {
          url: `/post`,
          method: "POST",
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          collabapi.util.updateQueryData(
            "getYourPost",
            body?.loggedInEmail,
            (draft) => {
              draft.push(data);
              return draft;
            }
          )
        );
        dispatch(
          collabapi.util.updateQueryData("getExplorePost", {}, (draft) => {
            draft?.push(data);
            return draft;
          })
        );
      },
    }),
    deletePost: builder.mutation({
      query: (body: { _id: string; loggedInEmail: string }) => {
        return {
          url: `/delete-post`,
          method: "DELETE",
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          collabapi.util.updateQueryData(
            "getYourPost",
            body?.loggedInEmail,
            (draft) => {
              return draft?.filter((post: Post) => post?._id !== body?._id);
            }
          )
        );
        dispatch(
          collabapi.util.updateQueryData("getExplorePost", {}, (draft) => {
            return draft?.filter((post: Post) => post?._id !== body?._id);
          })
        );
      },
    }),
    updatePost: builder.mutation({
      query: (body: Post) => {
        return {
          url: `/update-post`,
          method: "PUT",
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          collabapi.util.updateQueryData(
            "getYourPost",
            body?.loggedInEmail,
            (draft) => {
              let post = draft?.find((post: Post) => post?._id === body?._id);
              updateCache(post, data);
              post = data;
            }
          )
        );
        dispatch(
          collabapi.util.updateQueryData("getExplorePost", {}, (draft) => {
            let post = draft?.find((post: Post) => post?._id === data?._id);
            updateCache(post, data);
          })
        );
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
