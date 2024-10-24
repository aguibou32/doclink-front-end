import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Home from './screens/Home'
import Login from './screens/Login'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<App />}>

    <Route index={true} element={<Home />} />
    <Route path='/login' element={<Login />} />

  </Route>

))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)