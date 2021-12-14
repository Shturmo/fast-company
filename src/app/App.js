import React, { useEffect, useState } from "react"
import api from "./api"
import Users from "./components/users"

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    })
    setUsers(updatedUsers)
  }

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggle={handleToggleBookMark}
      />
    </>
  )
}

export default App
