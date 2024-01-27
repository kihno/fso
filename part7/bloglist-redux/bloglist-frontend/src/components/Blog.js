import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { removeBlog, updateBlog } from '../reducers/blogsReducer'

const Blog = (props) => {
  const { user, blog } = props

  const [buttonLabel, setButtonLabel] = useState('view')
  const [hidden, setHidden] = useState(true)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (buttonLabel === 'view') {
      setButtonLabel('hide')
    } else {
      setButtonLabel('view')
    }

    setHidden(!hidden)
  }

  //Malformatted id when liking a blog created by same user

  const updateLikes = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const deleteBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button className='view-btn' onClick={handleClick}>
        {buttonLabel}
      </button>
      {hidden ? null : (
        <div className='togglableContent'>
          <div className='blog-url'>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className='blog-likes'>
            {blog.likes}{' '}
            <button className='like-btn' onClick={updateLikes}>
              like
            </button>
          </div>
          <div className='blog-user'>{blog.user && blog.user.name}</div>
          {blog.user && blog.user.username === user.username ? (
            <button className='remove-btn' onClick={deleteBlog}>
              remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
