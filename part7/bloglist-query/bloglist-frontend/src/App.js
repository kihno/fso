import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Route, Routes, useMatch } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { getBlogs, setToken } from './services/blogs'
import Notification from './components/Notification'
import NotificationContext from './context/notificationContext'
import UserContext from './context/userContext'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Navbar from './components/Navbar'

const App = () => {
  const [error, setError] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const expiration = new Date(jwtDecode(user.token).exp * 1000)

      if (expiration > new Date()) {
        userDispatch({ type: 'CREATE', payload: user })
        setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setError(null)
    }, 5000)
  }, [error])

  useEffect(() => {
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }, [notification])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  const blogs = result.data

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <div>
      <Notification error={error}  />
      { user ?
        <div>
          <Navbar />
          <h2>blogs</h2>
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

export default App
