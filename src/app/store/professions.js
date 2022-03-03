import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"
import isOutdated from "../utils/isOutdated"

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceved, professionsRequestFailed } =
  actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested())
    try {
      const { content } = await professionService.fetchAll()
      dispatch(professionsReceved(content))
    } catch (error) {
      dispatch(professionsRequestFailed(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading
export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entities.length > 0) {
    return state.professions.entities.find((prof) => prof._id === professionId)
  }
  return {}
}

export default professionsReducer
