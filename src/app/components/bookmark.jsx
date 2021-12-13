import React from "react"
import PropTypes from "prop-types"

const BookMark = ({ status, ...rest }) => {
  if (status) return <i className="bi bi-heart-fill"></i>
  return <i className="bi bi-heart"></i>
}

BookMark.propTypes = {
  status: PropTypes.bool,
}
export default BookMark
