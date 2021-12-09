import React from 'react'
import BookMark from './bookmark'
import Qualitie from './qualitie'

const User = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  _id,
  isFavorite,
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
          <BookMark status={isFavorite} />
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

export default User
