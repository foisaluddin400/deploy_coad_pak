import { baseApi } from "./baseApi";

const refundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       getRefundPolicy: builder.query({
      query: () => {
        return {
          url: "/home/get-refund-policy",
          method: "GET",
        };
      },
      providesTags: ["refundPolicy"],
    }),

  }),
});

export const {
useGetRefundPolicyQuery
} = refundApi;