import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getUsers } from '../services/users'


const User = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const user = result.data.find(u => u.id === id)

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs && user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
