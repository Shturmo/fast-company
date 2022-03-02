import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logOut } from "../store/users"

const LogOut = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("logout")
    dispatch(logOut())
  }, [])

  return "loading logOut"
}

export default LogOut
