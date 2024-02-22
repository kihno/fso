import { updateBlog, deleteBlog } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../context/notificationContext'
import { useUserValue } from '../context/userContext'
import CommentForm from './CommentForm'
import { Button, Card, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
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
      notificationDispatch({ type: 'ERROR', payload: error.response.data.error })
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
      notificationDispatch({ type: 'ERROR', payload: error.response.data.error })
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
    <Card className="blog">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>added by {blog.user && blog.user.name}</Card.Subtitle>
        <Card.Link href='blog.url'>{blog.url}</Card.Link>
        <Card.Text>{blog.likes} likes <Button variant='success' size='sm' onClick={updateLikes}>like</Button></Card.Text>
        <Card.Text>{blog.user && blog.user.username === user.username ? <Button variant='danger' size='sm' onClick={removeBlog}>remove</Button> : null}</Card.Text>
        <Card.Header>Comments</Card.Header>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <CommentForm blog={blog} />
          </ListGroup.Item>
          {blog.comments && blog.comments.map(comment =>
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Blog
