import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import userService from "../services/user.sevice"
import { toast } from "react-toastify"
import { setTokens } from "../services/localStorage.service"

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  async function signIn({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      })

      setTokens(data)
    } catch (error) {
      const { code, message } = error.response.data.error

      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Пользователь с таким Email не зарегестрирован",
          }
          throw errorObject
        } else if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Указан неверный пароль",
          }
          throw errorObject
        }
      }
    }
  }

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      })

      setTokens(data)
      await createUser({ _id: data.localId, email, password, ...rest })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже сущеуствует",
          }
          throw errorObject
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
