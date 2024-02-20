import { useState, useEffect, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'

import Notification from './components/Notification'
import NotificationContext from './context/notificationContext'
import { useUserDispatch } from './context/userContext'
import { setToken } from './services/blogs'
import Home from './components/Home'

const App = () => {
  const [error, setError] = useState(null)

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const userDispatch = useUserDispatch()

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

  return (
    <div>
      <Notification error={error}  />
      <Home setError={setError} />
    </div>
  )
}

export default App
