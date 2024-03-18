import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const updateCache = (post: any, data: any) => {
  console.log(data);
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
      query: (body: any) => {
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
            console.log(JSON.stringify(data));
            draft?.push(data);
            return draft;
          })
        );
      },
    }),
    deletePost: builder.mutation({
      query: (body: any) => {
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
              return draft?.filter((post: any) => post?._id !== body?._id);
            }
          )
        );
        dispatch(
          collabapi.util.updateQueryData("getExplorePost", {}, (draft) => {
            console.log(JSON.stringify(body));
            return draft?.filter((post: any) => post?._id !== body?._id);
          })
        );
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
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          collabapi.util.updateQueryData(
            "getYourPost",
            body?.loggedInEmail,
            (draft) => {
              let post = draft?.find((post: any) => post?._id === body?._id);
              updateCache(post, data);
              post = data;
            }
          )
        );
        dispatch(
          collabapi.util.updateQueryData("getExplorePost", {}, (draft) => {
            let post = draft?.find((post: any) => post?._id === data?._id);
            console.log(JSON.stringify(data));
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
