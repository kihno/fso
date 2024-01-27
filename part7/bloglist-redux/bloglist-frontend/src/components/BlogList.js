import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { initializeBlogs } from '../reducers/blogsReducer'

const BlogList = (props) => {
  const { user } = props

  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      {blogs
        //.sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
