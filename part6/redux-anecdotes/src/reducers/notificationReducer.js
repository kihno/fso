import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    const milliseconds = time * 1000
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, milliseconds)
  }
} 

export default notificationSlice.reducer
