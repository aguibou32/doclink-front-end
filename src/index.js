import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import VerifyEmail from './screens/VerifyEmail'

import PrivateRoute from './components/auth-routes/PrivateRoute'

import { Provider } from 'react-redux'
import store from './store'


import './i18n'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(

  // Public routes
  <Route path='/' element={<App />}>

    {/* Public routes */}
    <Route index={true} element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/verify-email' element={<VerifyEmail />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password/:token' element={<ResetPassword />} />
  

    {/* Private routes */}
    <Route path='' element={<PrivateRoute />}>

    </Route>

  </Route>

))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)