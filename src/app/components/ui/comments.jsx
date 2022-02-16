import { orderBy } from "lodash"
import React from "react"
import { useComments } from "../../hooks/useComments"
import CommentsList, { AddCommentForm } from "../common/comments"

const Comments = () => {
  const { createComment, comments, removeComment } = useComments()

  const sortedComments = orderBy(comments, ["created_at"], ["desc"])
  const handleRemoveComment = (id) => {
    removeComment(id)
  }

  const handleSubmit = (data) => {
    createComment(data)
  }

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {comments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
