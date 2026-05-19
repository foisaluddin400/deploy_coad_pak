import { baseApi } from "./baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({




    getTermsConditions: builder.query({
      query: () => {
        return {
          url: "/home/get-terms-condition",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: "home/get-privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["privecy"],
    }),
   
  }),
});

export const {
  useGetTermsConditionsQuery,
  useGetPrivecyQuery,






} = businessApi;
