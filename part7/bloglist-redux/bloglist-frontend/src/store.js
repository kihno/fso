import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import errorReducer from './reducers/errorReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: usersReducer,
    notification: notificationReducer,
    error: errorReducer
  }
})

export default store
