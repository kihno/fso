import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'

import { initializeBlogs, createBlog, setBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setError } from '../reducers/errorReducer'

const BlogList = (props) => {
  const { user, setUser } = props

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      //setBlogs(blogs.concat(newBlog))
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} has been created`))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
      if (exception.response.data.error === 'token expired') {
        setUser(null)
      }
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(updatedBlogs.concat(updatedBlog))
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((b) => b.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      dispatch(setError(exception.response.data.error))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        //.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default BlogList
