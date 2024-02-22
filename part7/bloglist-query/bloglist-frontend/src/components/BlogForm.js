import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationDispatch } from '../context/notificationContext'
import { createBlog } from '../services/blogs'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type="text" value ={title} name="title" onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control type="text" value ={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control type="text" value ={url} name="url" onChange={({ target }) => setUrl(target.value)} />
        </Form.Group>
        <Button variant='primary' type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
