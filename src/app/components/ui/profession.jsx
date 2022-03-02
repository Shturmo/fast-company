import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
  getProfessionById,
  getProfessionsLoadingStatus,
} from "../../store/professions"

const Profession = ({ profId }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionById(profId))

  if (!isLoading) {
    return <p>{prof.name}</p>
  }
  return "loading profession"
}

Profession.propTypes = {
  profId: PropTypes.string,
}

export default Profession
