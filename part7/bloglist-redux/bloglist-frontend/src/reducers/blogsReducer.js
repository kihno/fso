import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'
import { setError } from './errorReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      console.log(newBlog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} has been created`))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      // if (exception.response.data.error === 'token expired') {
      //   setUser(null)
      // }
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      // if (exception.response.data.error === 'token expired') {
      //   setUser(null)
      // }
    }
  }
}

export const updateBlog = (id, blogObject) => {
  return async dispatch => {
    try {
      await blogService.update(id, blogObject)
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      // if (exception.response.data.error === 'token expired') {
      //   setUser(null)
      // }
    }
  }
}

export const { setBlogs, appendBlog, deleteBlog } = blogsSlice.actions
export default blogsSlice.reducer
