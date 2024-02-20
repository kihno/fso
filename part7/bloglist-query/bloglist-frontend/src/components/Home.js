import { Routes, Route, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getBlogs } from '../services/blogs'
import { useUserValue } from '../context/userContext'
import BlogList from './BlogList'
import Login from './Login'
import UserList from './UserList'
import User from './User'
import Blog from './Blog'


const Home = ({ setError }) => {
  const user = useUserValue()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  const blogs = result.data

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null


  return(
    <div>
      { user ?
        <div>
          <h2>blogs</h2>
          {/* <p>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></p> */}
          <Routes>
            <Route path='/' element={<BlogList setError={setError} />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog blog={blog} setError={setError} />} />
          </Routes>
        </div> :
        <Login setError={setError} />}
    </div>
  )
}

export default Home
