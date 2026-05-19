import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       getFaq: builder.query({
      query: ({ userRole }) => {
        return {
          url: `/faq/get-all-faq?role=${userRole}`,
          method: "GET",
        };
      },
      providesTags: ["faq"],
    }),
  }),
});

export const {
useGetFaqQuery
} = faqApi;