import { useState } from 'react'

import loginService from '../services/login'
import { setToken } from '../services/blogs'
import { useUserDispatch } from '../context/userContext'

const Login = ({ setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      userDispatch({ type: 'CREATE', payload: user })
      setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('Wrong username or password')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input id="username" type="text" value ={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input id="password" type="password" value ={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
