import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import loginService from '../services/login'
import { setToken } from '../services/blogs'
import { useUserDispatch } from '../context/userContext'
import { useNotificationDispatch } from '../context/notificationContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

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
      notificationDispatch({ type: 'ERROR', payload: 'Wrong username or password' })
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type='text' name='username' value ={username} onChange={({ target }) => setUsername(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type='password' name='password' value ={password} onChange={({ target }) => setPassword(target.value)} />
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  )
}

export default Login
