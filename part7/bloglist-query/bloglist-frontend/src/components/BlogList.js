import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { getBlogs } from '../services/blogs'

const BlogList = ({ setError }) => {

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
        <Blog key={blog.id} blog={blog} setError={setError} />
      )}
    </div>
  )
}

export default BlogList
