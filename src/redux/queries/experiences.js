import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, PORT_TOKEN } from "../../constants";
import Cookies from "js-cookie";

const experiencesQuery = createApi({
  reducerPath: "experiences",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(PORT_TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (params) => ({
        method: "GET",
        url: "experiences",
        params,
      }),
      transformResponse: (res) => ({
        experiences: res?.data?.map((el) => ({ ...el, key: el?._id })),
        total: res?.pagination?.total,
      }),
    }),
    getExperience: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `experiences/${id}`,
      }),
    }),
    addExperience: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "experiences",
        body,
      }),
    }),
    editExperience: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `experiences/${id}`,
        body,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `experiences/${id}`,
      }),
    }),
  }),
});

const { reducerPath: experiencesName, reducer: experiencesReducer } =
  experiencesQuery;
export { experiencesQuery as default, experiencesName, experiencesReducer };
export const {
  useGetExperiencesQuery,
  useGetExperienceMutation,
  useAddExperienceMutation,
  useEditExperienceMutation,
  useDeleteExperienceMutation,
} = experiencesQuery;
