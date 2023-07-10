import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [notice])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setError(null)
    }, 5000)
  }, [error])

  useEffect(() => {
    setTimeout(() => {
      setNotice(null)
    }, 5000)
  }, [notice])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
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

  const Homepage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <BlogForm setNotice={setNotice} setError={setError} />
      </div>
    )
  }

  return (
    <div>
      <Notification error={error} notice={notice} />
      { user ?
        <Homepage />
      : <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />}
    </div>
  )
}

export default App
