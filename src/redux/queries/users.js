import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDPOINT, PORT_TOKEN } from "../../constants";

const usersQuery = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(PORT_TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        users: res?.data?.map((el) => ({ ...el, key: el?._id })),
        total: res?.pagination?.total,
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `users/${id}`,
      }),
    }),
    addUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "users",
        body,
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `users/${id}`,
        body,
      }),
    }),
    upgradeUser: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `users/${id}`,
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "auth/upload",
        body,
      }),
    }),
  }),
});

const { reducerPath: usersName, reducer: usersReducer } = usersQuery;
export { usersQuery as default, usersName, usersReducer };
export const {
  useGetUsersQuery,
  useGetUserMutation,
  useUploadPhotoMutation,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useUpgradeUserMutation
} = usersQuery;
