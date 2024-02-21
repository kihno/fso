import { useQuery } from '@tanstack/react-query'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getBlogs } from '../services/blogs'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return(
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList
