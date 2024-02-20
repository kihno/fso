import { updateBlog, deleteBlog } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../context/notificationContext'
import { useUserValue } from '../context/userContext'

const Blog = ({ blog, setError }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUserValue()

  const editBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      notificationDispatch({ type: 'LIKE', payload: updatedBlog })
    },
    onError: (error) => {
      setError(error.response.data.error)
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
      setError(error.response.data.error)
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

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div className='blog-url'><a href={blog.url}>{blog.url}</a></div>
      <div className='blog-likes'>{blog.likes} likes <button className='like-btn' onClick={updateLikes}>like</button></div>
      <div className='blog-user'>added by {blog.user && blog.user.name}</div>
      {blog.user && blog.user.username === user.username ? <button className="remove-btn" onClick={removeBlog}>remove</button> : null}
    </div>
  )
}

export default Blog
