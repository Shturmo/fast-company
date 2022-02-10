import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import qualityService from "../services/quality.service"
import { toast } from "react-toastify"

const QualitiesContex = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContex)
}

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getQualitiesList()
  }, [])

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

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id)
  }

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <QualitiesContex.Provider
      value={{
        qualities,
        getQuality,
        isLoading,
      }}
    >
      {children}
    </QualitiesContex.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
