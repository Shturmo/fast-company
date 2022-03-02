import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import PropTypes from "prop-types"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import _ from "lodash"
import UsersTable from "../../ui/usersTable"
import TextField from "../../common/form/textField"
import { useSelector } from "react-redux"
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from "../../../store/professions"
import { getCurrentUserId, getUsers } from "../../../store/users"

const UsersListPage = () => {
  const users = useSelector(getUsers())
  const currentUserId = useSelector(getCurrentUserId())

  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchQuery, setSearchQuery] = useState("")

  const pageSize = 8

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
    setSearchQuery("")
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
    setSearchQuery("")
  }

  const handleSearch = (target) => {
    clearFilter()
    setSearchQuery(target.value)
  }

  if (!users) return "loading usersListPage"

  function filterUsers(data) {
    const filteredUsers = selectedProf
      ? data.filter((user) => _.isEqual(user.profession, selectedProf._id))
      : searchQuery
      ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data

    return filteredUsers.filter((user) => user._id !== currentUserId)
  }

  const filteredUsers = filterUsers(users)
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  // При удалении последнего элемента на последней странице отображаем предпоследнюю страницу
  if (userCrop.length === 0 && currentPage !== 1) {
    setCurrentPage(Math.ceil(count / pageSize))
  }

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
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
          name="searchQuery"
          value={searchQuery}
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

UsersListPage.propTypes = {
  users: PropTypes.array,
}

export default UsersListPage
