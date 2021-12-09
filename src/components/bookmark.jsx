import React from 'react'
const BookMark = ({ status, ...rest }) => {
  if (status) return <i className="bi bi-heart-fill"></i>
  return <i className="bi bi-heart"></i>
}

export default BookMark
