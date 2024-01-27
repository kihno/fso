import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError(state, action) {
      return action.payload
    },

  }
})

export const { setError } = errorSlice.actions
export default errorSlice.reducer
