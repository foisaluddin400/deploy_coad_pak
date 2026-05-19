import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getSingleBusinessContact: builder.query({
      query: ({ userId,businessId }) => {
        return {
          url: `/user/seller-detail?userId=${userId}&businessId=${businessId}`,
          method: "GET",
        };
      },
      providesTags: ["contact"],
    }),
       addContact: builder.mutation({
      query: (data) => {
        return {
          url: "/home/help-and-support",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
useGetSingleBusinessContactQuery,
useAddContactMutation
} = contactApi;