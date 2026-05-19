import { baseApi } from "./baseApi";

const subscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
      postSubscriber: builder.mutation({
      query: (email) => {
        return {
          url: "/subscriber/create-subscriber",
          method: "POST",
          body: email,
        };
      },
      invalidatesTags: ["subscriber"],
    }),
  }),
});

export const {
usePostSubscriberMutation
} = subscriberApi;