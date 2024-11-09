import { useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../slices/authSlice"
import Cookies from "js-cookie"

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Check if the user session cookie exists
  const isUserLoggedIn = Cookies.get("userInfo")

  useEffect(() => {
    // Logout if the cookie is missing or deleted
    if (!isUserLoggedIn) {
      dispatch(logout())
    }

    // Listen for cookie changes to log out the user in real-time
    const handleStorageChange = () => {
      if (!Cookies.get("userInfo")) {
        dispatch(logout())
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [isUserLoggedIn, dispatch])

  if (!isUserLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute

// Why did you add a useEffect here ?
// Here is the problem you were facing, you are using cookies to make sure the user is logged in or not 
// The problem is, even after 5 min (the cookie's life), the user can still perform actions on the app unless there is a page refresh
// Now if there is a page refresh, the cookie is gone and the user is logged out
// But you cannot afford that because the user might not even refresh the page, meaning they can continue doing whatever they want, 
// even though they are already technically logged out.
// To solve this, everytime the user access a page, there is a check if the cookie holding the user info is there or not 
// If it is not there, then it logs out the user