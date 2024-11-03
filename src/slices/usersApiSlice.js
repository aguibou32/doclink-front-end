import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    checkEmailInUse: builder.mutation({
      query: email => ({
        url: `${USERS_URL}/check-email-in-use`,
        method: 'POST',
        body: email
      })
    }),

    checkPhoneInUse: builder.mutation({
      query: phone => ({
        url: `${USERS_URL}/check-phone-in-use`,
        method: 'POST',
        body: phone
      })
    }),

    getUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/get-user`,
        method: 'GET'
      })
    }),

    register: builder.mutation({
      query: user => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),

    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),

    updateProfile: builder.mutation({
      query: user => ({
        url: `${USERS_URL}/update`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User']
    }),

    forgotPassword: builder.mutation({
      query: email => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: email
      })
    }),

    resetPassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: data
      })
    }),

    changePassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/change-password`,
        method: 'POST',
        body: data
      })
    })
  }),
})

export const {
  useCheckEmailInUseMutation,
  useCheckPhoneInUseMutation,
  useGetUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
  } = usersApiSlice