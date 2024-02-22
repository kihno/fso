import { useQuery } from '@tanstack/react-query'
import Table from 'react-bootstrap/Table'

import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getBlogs } from '../services/blogs'
import { Link } from 'react-router-dom'

const BlogList = () => {
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
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id} >
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
