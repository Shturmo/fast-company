import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Qualitie from "./qualitie"
import { useSelector, useDispatch } from "react-redux"
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from "../../../store/qualities"

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (!isLoading) {
    return (
      <>
        {qualitiesList.map((qual) => {
          return <Qualitie key={qual._id} {...qual} />
        })}
      </>
    )
  }
  return "loading qualitiesList"
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList
