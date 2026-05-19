import { baseApi } from "./baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
      getAllFormate: builder.query({
      query: ({page, limit}) => {
        return {
          url: `/formation/get-all-format-website?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
    }),
    getSingleFormat: builder.query({
      query: ({ formationId }) => {
        return {
          url: `/formation/single-format?slug=${formationId}`,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
    }),
  
  }),
});

export const {
useGetAllFormateQuery,
useGetSingleFormatQuery
} = blogsApi;