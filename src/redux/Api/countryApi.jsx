import { baseApi } from "./baseApi";

const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getTopCountry: builder.query({
      query: () => {
        return {
          url: "/business/top-country",
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
  }),
});

export const {
useGetTopCountryQuery
} = countryApi;