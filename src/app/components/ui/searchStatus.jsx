import React from "react"
import PropTypes from "prop-types"

const SearchStatus = ({ length }) => {
  if (length === 0) {
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      </h2>
    )
  }

  const correctVerbForm = length > 1 ? "тусанут" : "тусанёт"
  const correctDeclensionOfWord =
    [2, 3, 4].includes(length % 10) && (length < 10 || length > 20)
      ? "человека"
      : "человек"
  const phrase = `${length} ${correctDeclensionOfWord} ${correctVerbForm} с тобой сегодня`

  return (
    <h2>
      <span className="badge bg-primary">{phrase}</span>
    </h2>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
}

export default SearchStatus
