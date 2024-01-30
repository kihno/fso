import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'
import { setError } from './errorReducer'
import { setUser } from './userReducer'

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
    editBlog(state, action) {
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
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
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} has been created`))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      if (exception.response.data.error === 'token expired') {
        dispatch(setUser(null))
      }
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      if (exception.response.data.error === 'token expired') {
        dispatch(setUser(null))
      }
    }
  }
}

export const updateBlog = (id, blogObject) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      dispatch(editBlog(updatedBlog))
    } catch (exception) {
      console.log(exception.response)
      dispatch(setError(exception.response.data.error))
      if (exception.response.data.error === 'token expired') {
        dispatch(setUser(null))
      }
    }
  }
}

export const { setBlogs, appendBlog, editBlog, deleteBlog } = blogsSlice.actions
export default blogsSlice.reducer
