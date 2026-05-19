import { baseApi } from "./baseApi";

const valuationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       addBusinessValuation: builder.mutation({
      query: (data) => {
        return {
          url: "/business/business-valuation",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["valuation"],
    }),
  }),
});

export const {
useAddBusinessValuationMutation
} = valuationApi;