import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import userService from "../services/user.sevice"
import { toast } from "react-toastify"

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getUser() {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <UserContext.Provider value={{ users }}>
      {!isLoading ? children : "loading..."}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
