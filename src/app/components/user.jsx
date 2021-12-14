import React from "react"
import BookMark from "./bookmark"
import Qualitie from "./qualitie"
import PropTypes from "prop-types"

const User = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  _id,
  bookmark,
  ...rest
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualitie key={qualitie._id} {...qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <button onClick={() => rest.onToggle(_id)}>
          <BookMark status={bookmark} />
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => rest.onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool,
}

export default User
