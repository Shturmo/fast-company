import React, { useEffect, useState } from "react"
import api from "../api"
import PropTypes from "prop-types"
import QualitiesList from "./qualitiesList"
import { useHistory } from "react-router-dom"

const UserPage = ({ id }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data)
    })
  }, [])

  const history = useHistory()
  const handleAllUsers = () => {
    history.push("/users")
  }

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleAllUsers}>Все пользователи</button>
      </>
    )
  }
  return <h1>Loading</h1>
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserPage
