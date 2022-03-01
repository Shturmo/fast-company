import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"

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
  dispatch(professionsRequested())
  try {
    const { content } = await professionService.fetchAll()
    setTimeout(() => {
      dispatch(professionsReceved(content))
      console.log("loadProfessionsList", getState())
    }, 2000)
  } catch (error) {
    dispatch(professionsRequestFailed(error.message))
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
