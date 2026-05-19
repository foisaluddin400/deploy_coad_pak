import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopCategtory: builder.query({
      query: () => {
        return {
          url: "/business/top-category",
          method: "GET",
        };
      },
      providesTags: ["topCategory"],
    }),



      getCategtory: builder.query({
      query: () => {
        return {
          url: "/category/get-all-category",
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),

  }),
});

export const { useGetTopCategtoryQuery , useGetCategtoryQuery} = categoryApi;
