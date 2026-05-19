import { baseApi } from "./baseApi";

const ndaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       addNda: builder.mutation({
      query: (data) => {
        return {
          url: "/agreement/create-agreement",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["nda"],
    }),
  }),
});

export const {
useAddNdaMutation
} = ndaApi;