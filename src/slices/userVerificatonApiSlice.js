import { apiSlice } from "./apiSlice"
import { USER_VERIFICATION } from "../constants"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    verifyEmail: builder.mutation({
      query: email => ({
        url: `${USER_VERIFICATION}/verify-email`,
        method: 'POST',
        body: email
      })
    }),

    resendVerificationEmail: builder.mutation({
      query: email => ({
        url: `${USER_VERIFICATION}/resend-verification-email`,
        method: 'POST',
        body: email
      })
    }),

  }),
})

export const {
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} = usersApiSlice