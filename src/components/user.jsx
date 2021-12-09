import React from 'react'
import Qualitie from './qualitie'

const User = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  _id,
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
        <button
          className="btn btn-danger"
          onClick={() => rest.onDeleteUser(_id)}
        >
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
