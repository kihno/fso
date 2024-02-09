import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NotificationContext from './context/notificationContext'
import UserContext from './context/userContext'
import { getBlogs, setToken } from './services/blogs'

const App = () => {
  const [error, setError] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'CREATE', payload: user })
      setToken(user.token)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'DELETE' })
  }

  const Homepage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} setError={setError} />
        )}
      </div>
    )
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      <Notification error={error}  />
      { user ?
        <Homepage /> :
        <Login setError={setError} />}
    </div>
  )
}

export default App
