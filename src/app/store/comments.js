import { createAction, createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import commentService from "../services/comment.service"

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    },
  },
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFailed,
  commentCreated,
  commentRemoved,
} = actions

const commentCreateRequested = createAction("comments/commentCreateRequested")
const commentCreateFailed = createAction("comments/commentCreateFailed")
const commentRemoveRequested = createAction("comments/commentRemoveRequested")
const commentRemoveFailed = createAction("comments/commentRemoveFailed")

export const createComment = (data) => async (dispatch) => {
  dispatch(commentCreateRequested())
  const comment = {
    ...data,
    _id: nanoid(),
    created_at: Date.now(),
  }

  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(commentCreateFailed())
  }
}

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested())
  try {
    const { content } = await commentService.removeComment(id)
    if (content === null) {
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(commentRemoveFailed())
  }
}

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceved(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
