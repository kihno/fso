import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      if (action.payload.type === 'VOTE') {
        return `you voted '${action.payload.content}'`
      } else if (action.payload.type === 'CREATE') {
        return `you created '${action.payload.content}'`
      }
    },
    clearMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
