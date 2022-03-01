import { createSlice } from "@reduxjs/toolkit"
import qualityService from "../services/quality.service"

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } = actions

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true
  }
  return false
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualityService.fetchAll()
      setTimeout(() => {
        dispatch(qualitiesReceved(content))
        console.log("loadQualitiesList", getState())
      }, 1000)
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message))
    }
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) =>
  state.qualities.isLoading
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  const qualitiesArray = []
  for (const qualId of qualitiesIds) {
    for (const quality of state.qualities.entities) {
      if (quality._id === qualId) {
        qualitiesArray.push(quality)
        break
      }
    }
  }
  return qualitiesArray
}

export default qualitiesReducer
