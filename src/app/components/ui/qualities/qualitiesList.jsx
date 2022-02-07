import React from "react"
import PropTypes from "prop-types"
import Qualitie from "./qualitie"
import { useQualities } from "../../../hooks/useQualities"

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities()

  if (!isLoading) {
    return (
      <>
        {qualities.map((qualityId) => {
          const quality = getQuality(qualityId)
          return <Qualitie key={quality._id} {...quality} />
        })}
      </>
    )
  }
  return "loading..."
}

QualitiesList.propTypes = {
  qualities: PropTypes.array,
}

export default QualitiesList
