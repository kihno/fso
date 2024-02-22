import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationDispatch } from '../context/notificationContext'
import { createBlog } from '../services/blogs'

const BlogForm = () => {
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const notificationDispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notificationDispatch({ type: 'CREATE', payload: newBlog })
    }
  })

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }

    newBlogMutation.mutate(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id="title" type="text" value ={title} name="Username" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id="author" type="text" value ={author} name="Username" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id="url" type="text" value ={url} name="Username" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="submit-btn" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
