import { useState } from 'react'
import { updateBlog, deleteBlog } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../context/notificationContext'

const Blog = (props) => {
  const { user, blog } = props

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [buttonLabel, setButtonLabel] = useState('view')
  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

  const editBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      notificationDispatch({ type: 'LIKE', payload: updatedBlog })
    },
    onError: (error) => {
      notificationDispatch({ type: 'NOTICE', payload: error.response.data.error })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))
      notificationDispatch({ type: 'DELETE', payload: blog })
    },
    onError: (error) => {
      notificationDispatch({ type: 'NOTICE', payload: error.response.data.error })
    }
  })

  const updateLikes = (event) => {
    event.preventDefault()

    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    editBlogMutation.mutate(updatedBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author} <button className='view-btn' onClick={handleClick}>{buttonLabel}</button>
      { hidden ?
        null :
        <div className='togglableContent'>
          <div className='blog-url'><a href={blog.url}>{blog.url}</a></div>
          <div className='blog-likes'>{blog.likes} <button className='like-btn' onClick={updateLikes}>like</button></div>
          <div className='blog-user'>{blog.user && blog.user.name}</div>
          {blog.user && blog.user.username === user.username ? <button className="remove-btn" onClick={removeBlog}>remove</button> : null}
        </div>}
    </div>
  )
}

export default Blog
