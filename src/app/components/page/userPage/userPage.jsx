import React, { useEffect, useState } from "react"
import api from "../../../api"
import PropTypes from "prop-types"
import Qualities from "../../ui/qualities"
import { useHistory } from "react-router-dom"

const UserPage = ({ id }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data)
    })
  }, [])

  const history = useHistory()
  const handleChange = () => {
    history.push(`/users/${id}/edit`)
  }

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleChange}>Изменить</button>
      </>
    )
  }
  return <h1>Loading</h1>
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired,
}

export default UserPage
