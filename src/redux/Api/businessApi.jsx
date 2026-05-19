import { baseApi } from "./baseApi";

const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBusiness: builder.query({
      query: ({ businessId }) => {
        return {
          url: `/business/single-business?businessId=${businessId}`,
          method: "GET",
        };
      },
      providesTags: ["singleBusiness"],
    }),

    getSingleIterestUser: builder.query({
      query: ({ businessId }) => {
        return {
          url: `/business/get-single-business-with-users?slug=${businessId}`,
          method: "GET",
        };
      },
      providesTags: ["interest"],
    }),

    getDetailsSingleIterestUser: builder.query({
      query: ({ businessId, interestedId }) => {
        return {
          url: `/business/interested-buyers-details?businessId=${businessId}&interestedId=${interestedId}`,
          method: "GET",
        };
      },
      providesTags: ["interest"],
    }),

    getAllBusiness: builder.query({
      query: () => {
        return {
          url: `/interested/interested-business`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),

    getAllFeturesBusiness: builder.query({
      query: ({ businessRole, country }) => {
        let url = `/business/featured-business?businessRole=${businessRole}`;
        if (country) {
          url += `&country=${country}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["feature"],
    }),

    getAllBusinessHome: builder.query({
      query: () => {
        return {
          url: `/business/all-business`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),

    getMostViewBusinessIdea: builder.query({
      query: ({ country }) => {
        let url = `/business/most-viewed-idea`;

        if (country) {
          url += `?country=${country}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["mostVeiw"],
    }),

    getAllBusinessMostView: builder.query({
      query: ({ userId, role, country } = {}) => {
        let queryParams = [];

        if (userId) queryParams.push(`userId=${userId}`);
        if (role) queryParams.push(`role=${role}`);
        if (country) queryParams.push(`country=${country}`);

        const queryString =
          queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        return {
          url: `/business/most-viewed${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),

    deleteBusiness: builder.mutation({
      query: ({ businessId, role }) => {
        return {
          url: `/business/delete-business?businessId=${businessId}&role=${role}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["business"],
    }),

    addInterest: builder.mutation({
      query: (data) => {
        return {
          url: "interested/make-interested",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["interest"],
    }),

    addBusiness: builder.mutation({
      query: (data) => {
        return {
          url: "/business/create-business",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["business"],
    }),

    updateSingle: builder.mutation({
      query: ({ formData, businessId, user }) => {
        return {
          url: `/business/update-business?businessId=${businessId}&user=${user}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["business"],
    }),

    getAllBusinesFilter: builder.query({
      query: ({
        category,
        location,
        country,
        ageOfListing,
        state,
        city,
        sortBy,
        businessType,
        ownerShipType,
        askingPrice,
        searchText,
        businessRole,
        subCategory,
        page,
        limit,
      }) => {
        let url = `/business/filter-business`;

        const params = [];
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (page) params.push(`page=${encodeURIComponent(page)}`);
        if (limit) params.push(`limit=${encodeURIComponent(limit)}`);
        if (subCategory)
          params.push(`subCategory=${encodeURIComponent(subCategory)}`);
        if (location) params.push(`location=${encodeURIComponent(location)}`);
        if (country) params.push(`country=${encodeURIComponent(country)}`);
        if (state) params.push(`state=${encodeURIComponent(state)}`);
        if (city) params.push(`city=${encodeURIComponent(city)}`);
        if (ageOfListing)
          params.push(`ageOfListing=${encodeURIComponent(ageOfListing)}`);
        if (sortBy) params.push(`sortBy=${encodeURIComponent(sortBy)}`);
        if (businessType)
          params.push(`businessType=${encodeURIComponent(businessType)}`);
        if (ownerShipType)
          params.push(`ownerShipType=${encodeURIComponent(ownerShipType)}`);
        if (askingPrice)
          params.push(`askingPrice=${encodeURIComponent(askingPrice)}`);
        if (searchText)
          params.push(`searchText=${encodeURIComponent(searchText)}`);
        if (businessRole) {
          if (Array.isArray(businessRole)) {
            businessRole.forEach((role) =>
              params.push(`businessRole=${encodeURIComponent(role)}`),
            );
          } else {
            params.push(`businessRole=${encodeURIComponent(businessRole)}`);
          }
        }

        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),

    updateSold: builder.mutation({
      query: ({ businessId, isSold }) => {
        return {
          url: `/business/sold-business?businessId=${businessId}&isSold=${isSold}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["business"],
    }),
  }),
});

export const {
  useGetAllBusinessQuery,
  useAddBusinessMutation,
  useGetSingleBusinessQuery,
  useUpdateSingleMutation,
  useGetSingleIterestUserQuery,
  useGetDetailsSingleIterestUserQuery,
  useGetAllBusinessHomeQuery,
  useAddInterestMutation,
  useGetAllBusinesFilterQuery,
  useUpdateSoldMutation,
  useGetAllFeturesBusinessQuery,
  useGetAllBusinessMostViewQuery,
  useDeleteBusinessMutation,
  useGetMostViewBusinessIdeaQuery,
} = businessApi;
