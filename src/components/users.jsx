import React, { useState } from 'react'
import api from '../api'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const hadleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const renderPhrase = (number) => {
    const correctVerbForm = number > 1 ? 'тусанут' : 'тусанёт'
    const correctDeclensionOfWord =
      [2, 3, 4].includes(number % 10) && (number < 10 || number > 20)
        ? 'человека'
        : 'человек'
    const phrase = `${number} ${correctDeclensionOfWord} ${correctVerbForm} с тобой сегодня`
    return <span className="badge bg-primary">{phrase}</span>
  }

  const renderQualities = (user) => {
    return user.qualities.map((quality) => {
      const classes = `badge m-1 bg-${quality.color}`
      return (
        <span key={quality._id} className={classes}>
          {quality.name}
        </span>
      )
    })
  }

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id} onClick={() => hadleDelete(user._id)}>
        <td>{user.name}</td>
        <td>{renderQualities(user)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} / 5</td>
        <td>
          <button className="btn btn-danger">delete</button>
        </td>
      </tr>
    ))
  }

  if (users.length === 0)
    return (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      </h2>
    )
  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  )
}

export default Users
