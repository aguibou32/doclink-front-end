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

    resendUserVerificationEmail: builder.mutation({
      query: email => ({
        url: `${USER_VERIFICATION}/resend-user-verification-email`,
        method: 'POST',
        body: email
      })
    }),

    verifyTwoFactor: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/verify-two-factor`,
        method: 'POST',
        body: data
      })
    }),

    resend2FACodeByEmail: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/resend-2FA-code-by-email`,
        method: 'POST',
        body: data
      })
    }),

    send2FACodeBySMS: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/send-2FA-code-by-sms`,
        method: 'POST',
        body: data
      })
    }),

    resend2FACodeBySMS: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/resend-2FA-code-by-sms`,
        method: 'POST',
        body: data
      })
    }),


    sendEmailChangeVerification: builder.mutation({
      query: newEmail => ({
        url: `${USER_VERIFICATION}/send-email-change-verification`,
        method: 'POST',
        body: newEmail
      })
    }),

    resendEmailChangeVerification: builder.mutation({
      query: newEmail => ({
        url: `${USER_VERIFICATION}/resend-email-change-verification`,
        method: 'POST',
        body: newEmail
      })
    }),

    verifyNewEmail: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/verify-new-email`,
        method: 'POST',
        body: data
      })
    }),

    verifyPhoneNumber: builder.mutation({
      query: data => ({
        url: `${USER_VERIFICATION}/verify-phone-number`,
        method: 'POST',
        body: data
      })
    }),
  }),
})

export const {
  useVerifyEmailMutation,
  useResendUserVerificationEmailMutation,
  useVerifyTwoFactorMutation,
  useResend2FACodeByEmailMutation,
  useSend2FACodeBySMSMutation,
  useResend2FACodeBySMSMutation,
  useSendEmailChangeVerificationMutation,
  useResendEmailChangeVerificationMutation,
  useVerifyNewEmailMutation,
  useVerifyPhoneNumberMutation
} = usersApiSlice