import React from "react"
import PropTypes from "prop-types"
import EditorForm from "../../ui/editorForm"
import BackHistoryButton from "../../common/backButton"

const UserEditPage = () => {
  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditorForm />
        </div>
      </div>
    </div>
  )
}

UserEditPage.propTypes = {
  userId: PropTypes.string,
}

export default UserEditPage
