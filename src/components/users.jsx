import React, { useState } from 'react'
import api from '../api'
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  // console.log(users)
  const hadleDelete = (userId) => {
    // console.log(userId)
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  const renderPhrase = (number) => {
    // console.log(number)
    if (number === 0)
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>
    const correctVerbForm = number > 1 ? 'тусанут' : 'тусанёт'
    const correctDeclensionOfWord =
      [2, 3, 4].includes(number % 10) && (number < 10 || number > 20)
        ? 'человека'
        : 'человек'
    const phrase = `${number} ${correctDeclensionOfWord} ${correctVerbForm} с тобой сегодня`
    return <span className="badge bg-primary">{phrase}</span>
  }

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
        <tbody>
          {users.map((user) => (
            <tr key={user._id} onClick={() => hadleDelete(user._id)}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => {
                  const classes = `badge m-1 bg-${quality.color}`
                  return (
                    <span key={quality._id} className={classes}>
                      {quality.name}
                    </span>
                  )
                })}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate} / 5</td>
              <td>
                <button className="btn btn-danger">delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
