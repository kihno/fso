import { useState, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'

import { setError } from './reducers/errorReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setError('Wrong username or password'))
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
        <p>
          {user.name} logged in{' '}
          <button id='logout-btn' onClick={handleLogout}>
            logout
          </button>
        </p>
        <BlogList user={user} setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {user ? (
        <Homepage />
      ) : (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  )
}

export default App
