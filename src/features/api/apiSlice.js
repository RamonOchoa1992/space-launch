import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spacelaunchnow.me/api/3.3.0/launch",
  }),
  endpoints: (builder) => ({
    getList: builder.query({
      query: (url) =>
        url ? url : "https://spacelaunchnow.me/api/3.3.0/launch/upcoming",
    }),
  }),
});

export const { useGetListQuery, useLazyGetListByOffSetQuery } = apiSlice;
