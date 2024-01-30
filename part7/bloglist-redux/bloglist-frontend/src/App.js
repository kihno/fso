import { useEffect } from 'react'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      {user ? (
        <Homepage />
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
