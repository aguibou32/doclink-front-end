import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { encryptData, decryptData } from "../utils/dataEncryption"

const initialState = {
  userInfo: Cookies.get('userInfo') ? decryptData(Cookies.get('userInfo')) : null,
  twoFactorRequired: Cookies.get('twoFactorRequired') ? decryptData(Cookies.get('twoFactorRequired'))
    : {
        required: false,
        email: null,
        phone: null,
      },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      if (action.payload.userInfo) {
        state.userInfo = action.payload.userInfo
        Cookies.set('userInfo', encryptData(action.payload.userInfo), { 
          expires: 30 / 1440, 
          secure: process.env.REACT_APP_SECRET_KEY === 'production' ? true : false,
         }) // 30min
      }
      if (action.payload.twoFactorRequired) {
        state.twoFactorRequired = {
          required: true,
          email: action.payload.twoFactorRequired.email,
          phone: action.payload.twoFactorRequired.phone,
        }
        Cookies.set('twoFactorRequired', encryptData({
          required: true,
          email: action.payload.twoFactorRequired.email,
          phone: action.payload.twoFactorRequired.phone,
        }), { 
          expires: 30 / 1440, 
          secure: process.env.REACT_APP_SECRET_KEY === 'production' ? true : false,
        }) // 30min
      } else {
        state.twoFactorRequired = {
          required: false,
          email: null,
          phone: null,
        }
        Cookies.remove('twoFactorRequired')
      }
    },
    logout: (state) => {
      state.userInfo = null
      state.twoFactorRequired = {
        required: false,
        email: null,
        phone: null,
      }
      // Remove cookies on logout
      Cookies.remove('userInfo')
      Cookies.remove('twoFactorRequired')
    },
    resetTwoFactorRequired: (state) => {
      state.twoFactorRequired = {
        required: false,
        email: null,
        phone: null,
      }
      Cookies.remove('twoFactorRequired')
    },
  },
})

export const { login, logout, resetTwoFactorRequired } = authSlice.actions
export default authSlice.reducer
