import { baseApi } from "./baseApi";

const shedualApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
       postSchedule: builder.mutation({
      query: (data) => {
        return {
          url: "/schedule/make-schedule",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["shedual"],
    }),
  }),
});

export const {
usePostScheduleMutation
} = shedualApi;