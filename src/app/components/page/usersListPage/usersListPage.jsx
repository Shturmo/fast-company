import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import PropTypes from "prop-types"
import api from "../../../api"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import _ from "lodash"
import UsersTable from "../../ui/usersTable"
import TextField from "../../common/form/textField"
import { useUser } from "../../../hooks/useUsers"

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchString, setSearchString] = useState("")

  const pageSize = 8

  const { users } = useUser()
  // console.log(users)

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    console.log(userId)
  }

  const handleToggleBookMark = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    })
    // setUsers(updatedUsers)
    console.log(updatedUsers)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleProfessionSelect = (item) => {
    setSearchString("")
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
    setSearchString("")
  }

  const handleSearch = (target) => {
    clearFilter()
    setSearchString(target.value)
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => _.isEqual(user.profession, selectedProf))
      : searchString
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchString.toLowerCase())
        )
      : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    console.log(userCrop)

    // При удалении последнего элемента на последней странице отображаем предпоследнюю страницу
    if (userCrop.length === 0 && currentPage !== 1) {
      setCurrentPage(Math.ceil(count / pageSize))
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column w-100">
          <SearchStatus length={count} />
          <TextField
            name="searchString"
            value={searchString}
            onChange={handleSearch}
            placeholder="Search..."
          />
          {count !== 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return "loading..."
}

UsersListPage.propTypes = {
  users: PropTypes.array,
}

export default UsersListPage
