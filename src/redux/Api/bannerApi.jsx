import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getCategoryBanner: builder.query({
      query: (Category) => ({
        url: `/banner/get-banner-image?bannerType=${Category}`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

  }),
});

export const {
useGetCategoryBannerQuery
} = bannerApi;