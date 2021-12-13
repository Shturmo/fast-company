import React, { useState } from "react"
import api from "./api"
import SearchStatus from "./components/searchStatus"
import Users from "./components/users"

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.isFavorite = !user.isFavorite
      }
      return user
    })
    setUsers(updatedUsers)
  }

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        usersList={users}
        onDelete={handleDelete}
        onToggle={handleToggleBookMark}
      />
    </>
  )
}

export default App
