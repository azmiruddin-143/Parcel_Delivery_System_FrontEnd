
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
      invalidatesTags: ["USER"],
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
    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
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
    }),
    updateParcelStatus: builder.mutation({
      query: ({ parcelId, status, location, note }) => ({ // এখানে প্যারামিটারগুলো ডিস্ট্রাকচার করা হয়েছে
        url: `/parcels/${parcelId}/status`, // <-- আপনার নির্দিষ্ট URL এখানে
        method: 'PATCH',
        data: {
          status,
          location,
          note
        },
      }),
      invalidatesTags: ['PARCEL'], // এটি নিশ্চিত করবে যে ডেটা আপডেট হলে পুনরায় আনা হবে
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
  useParcelMutation,
  useAllparcelsQuery,
  useUpdateParcelStatusMutation
} = authApi;