import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getUnreadNotification: builder.query({
      query: () => {
        return {
          url: "/notification/get-unread-notification",
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),

    getNotification: builder.query({
      query: () => {
        return {
          url: "/notification/get-all-notification",
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),

    updateNotification: builder.mutation({
      query: ({ role, notificationId }) => {
        return {
          url: `/notification/update-notification?role=${role}&notificationId=${notificationId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["notification"],
    }),

    deleteNotification: builder.mutation({
      query: ({ role, notificationId }) => {
        return {
          url: `/notification/delete-notification?role=${role}&notificationId=${notificationId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
useDeleteNotificationMutation,useGetNotificationQuery,useGetUnreadNotificationQuery,useUpdateNotificationMutation
} = notificationApi;