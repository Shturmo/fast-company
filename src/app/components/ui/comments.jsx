import { orderBy } from "lodash"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments"
import { getCurrentUserId } from "../../store/users"
import CommentsList, { AddCommentForm } from "../common/comments"

const Comments = () => {
  const { userId } = useParams()
  const currentUserId = useSelector(getCurrentUserId())

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])
  const comments = useSelector(getComments())
  const isLoading = useSelector(getCommentsLoadingStatus())

  const sortedComments = orderBy(comments, ["created_at"], ["desc"])

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId, userId: currentUserId }))
  }

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "loading comments"
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
