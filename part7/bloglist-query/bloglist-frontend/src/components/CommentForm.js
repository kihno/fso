import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { updateBlog } from '../services/blogs'
import { useNotificationDispatch } from '../context/notificationContext'
import { Button, Form } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [comment, setComment] = useState('')

  const editBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
    },
    onError: (error) => {
      notificationDispatch({ type: 'ERROR', payload: error.response.data.error })
    }
  })

  const addComment = (event) => {
    event.preventDefault()

    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id,
      comments: blog.comments.concat({
        content: comment,
        id: uuidv4()
      })
    }

    editBlogMutation.mutate(updatedBlog)

    setComment('')
  }

  return(
    <Form onSubmit={addComment}>
      <Form.Control type="text" value ={comment} name="Comment" onChange={({ target }) => setComment(target.value)} />
      <Button variant='success' size='sm' type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm
