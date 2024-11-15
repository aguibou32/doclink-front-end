import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { encryptData, decryptData } from "../utils/dataEncryption"

const initialState = {
  userInfo: Cookies.get('userInfo') ? decryptData(Cookies.get('userInfo')) : null,
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
    },
    logout: (state) => {
      state.userInfo = null
      // Remove cookies on logout
      Cookies.remove('userInfo')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
