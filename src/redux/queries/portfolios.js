import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, PORT_TOKEN } from "../../constants";
import Cookies from "js-cookie";

const portfolioQuery = createApi({
  reducerPath: "portfolios",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(PORT_TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (params) => ({
        method: "GET",
        url: "portfolios",
        params,
      }),
      transformResponse: (res) => ({
        portfolios: res.data.map((el) => ({ ...el, key: el?._id })),
        total: res.pagination.total,
      }),
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `portfolios/${id}`,
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "portfolios",
        body,
      }),
    }),
    editPortfolio: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `portfolios/${id}`,
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `portfolios/${id}`,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "upload",
        body,
      }),
    }),
  }),
});

const { reducerPath: portfolioName, reducer: portfolioReducer } =
  portfolioQuery;

export { portfolioQuery as default, portfolioName, portfolioReducer };

export const {
  useGetPortfoliosQuery,
  useGetPortfolioMutation,
  useUploadPhotoMutation,
  useAddPortfolioMutation,
  useEditPortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioQuery;
