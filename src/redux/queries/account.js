import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, PORT_TOKEN } from "../../constants";
import Cookies from "js-cookie";

const accountQuery = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(PORT_TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        method: "GET",
        url: "auth/me",
      }),
      transformResponse: (res) => ({ ...res }),
    }),
    editAccount: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: "auth/updatedetails",
        body,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "auth/upload",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: "auth/updatepassword",
        body
      }),
    }),
  }),
});

const { reducerPath: accountName, reducer: accountReducer } = accountQuery;

export { accountQuery as default, accountName, accountReducer };

export const {
  useGetAccountQuery,
  useEditAccountMutation,
  useUploadPhotoMutation,
  useChangePasswordMutation
} = accountQuery;
