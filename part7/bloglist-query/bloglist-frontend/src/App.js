import { useState, useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NotificationContext from './context/notificationContext'

import { getBlogs, setToken } from './services/blogs'


const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  // const [notice, setNotice] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // const addBlog = async (blogObject) => {
  //   try {
  //     const newBlog = await blogService.create(blogObject)
  //     setBlogs(blogs.concat(newBlog))
  //     notificationDispatch({ type: 'CREATE', payload: newBlog })
  //   } catch(exception) {
  //     setError(exception.response.data.error)
  //     if(exception.response.data.error === 'token expired') {
  //       setUser(null)
  //     }
  //   }
  // }

  // const updateBlog = async (id, blogObject) => {
  //   try {
  //     const updatedBlog = await blogService.update(id, blogObject)
  //     const updatedBlogs = blogs.filter(b => b.id !== id)
  //     setBlogs(updatedBlogs.concat(updatedBlog))
  //   } catch(exception) {
  //     setError(exception.response.data.error)
  //   }
  // }

  // const deleteBlog = async (id) => {
  //   try {
  //     await blogService.remove(id)
  //     const updatedBlogs = blogs.filter(b => b.id !== id)
  //     setBlogs(updatedBlogs)
  //   } catch(exception) {
  //     setError(exception.response.data.error)
  //   }
  // }

  const Homepage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
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
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />}
    </div>
  )
}

export default App
