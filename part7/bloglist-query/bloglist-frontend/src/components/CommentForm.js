import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { updateBlog } from '../services/blogs'
import { useNotificationDispatch } from '../context/notificationContext'

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const [comment, setComment] = useState('')

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

  const addComment = (event) => {
    event.preventDefault()

    const newComment = {
      content: comment,
      id: uuidv4()
    }

    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(newComment)
    }
  }

  return(
    <form onSubmit={addComment}>
      <input id="comment" type="text" value ={comment} name="Comment" onChange={({ target }) => setComment(target.value)} />
      <button id="submit-btn" type="submit">create</button>
    </form>
  )
}

export default CommentForm
