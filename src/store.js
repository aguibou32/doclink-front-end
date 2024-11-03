import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import authSliceReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,  // Use the regular auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
  devTools: process.env.REACT_APP_NODE_ENV === 'development' ? true : false,
})
export default store