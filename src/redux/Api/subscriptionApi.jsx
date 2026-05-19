import { baseApi } from "./baseApi";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
      getPlane: builder.query({
      query: ({ role }) => {
        return {
          url: `/subscription/get-subscription-plan?role=${role}`,
          method: "GET",
        };
      },
      providesTags: ["plane"],
    }),
       getSingleSubscription: builder.query({
      query: ({ subscriptionId,role }) => {
        return {
          url: `/subscription/get-single-subscription-plan?subscriptionId=${subscriptionId}&role=${role}`,
          method: "GET",
        };
      },
      providesTags: ["plane"],
    }),
      postCheckout: builder.mutation({
      query: (data) => {
        return {
          url: "/payment/checkout",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["plane"],
    }),
        singleGetCoupon: builder.query({
      query: ({ couponCode }) => ({
        url: `/coupon/get-single-coupon?couponCode=${couponCode}`,
        method: "GET",
      }),
      providesTags: ["plane"],
    }),

  }),
});

export const {
useGetPlaneQuery,
useGetSingleSubscriptionQuery,
usePostCheckoutMutation,
 useLazySingleGetCouponQuery,
} = planApi;