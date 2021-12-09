import React, { useState } from 'react'
import api from './api'
import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const hadleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={hadleDelete} />
    </>
  )
}

export default App
