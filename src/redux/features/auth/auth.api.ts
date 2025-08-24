
import { baseApi } from "@/redux/base.api";
import { IResponse, ISendOtp, IVerifyOtp } from "@/type";

export const authApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),


     allUsers: builder.query({
      query: () => ({
        url: "/users/allusers",
        method: "GET",
      }),
       providesTags: ["User"], 
      
    }),


    changeUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`, 
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: ["User"] 
    }),


    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),


    parcel: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcels",
        method: "POST",
        data: parcelInfo,
      }),
    }),
    allparcels: builder.query({
      query: () => ({
        url: "/parcels/allparcels",
        method: "GET",
      }),
       providesTags: ["Parcel"], 
      
    }),
    updateParcelStatus: builder.mutation({
      query: ({ parcelId, status, location, note }) => ({
        url: `/parcels/${parcelId}/status`, 
        method: 'PATCH',
        data: {
          status,
          location,
          note
        },
      }),
       invalidatesTags: ["Parcel"]
    }),
     // --- New mutation for blocking a parcel ---
    blockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/block`, 
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"] 
    }),

    unblockParcel: builder.mutation({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/unblock`, 
        method: 'PATCH',
      }),
      invalidatesTags: ["Parcel"]
    }),


 getUserStats: builder.query({
      query: () => ({
        url: "/users/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getParcelStats: builder.query({
      query: () => ({
        url: "/parcels/stats",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),








  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,

  useAllUsersQuery,
  useChangeUserStatusMutation ,

  useParcelMutation,
  useAllparcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation, 
  useUnblockParcelMutation,


  useGetUserStatsQuery,
  useGetParcelStatsQuery,
} = authApi;