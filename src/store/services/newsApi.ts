import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Story } from "../types"
import { BASE_API_URL } from "../../utils"

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getNewsIds: builder.query<number[], void>({
      query: () => `newstories.json?orderBy="$priority"&limitToFirst=100`,
    }),
    getStoryById: builder.query<Story, number>({
      query: (id) => `item/${id}.json`,
    }),
  }),
})

export const { useGetNewsIdsQuery, useGetStoryByIdQuery } = newsApi
