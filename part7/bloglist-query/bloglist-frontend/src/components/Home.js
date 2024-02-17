import { useContext } from 'react'
import UserContext from '../context/userContext'
import BlogList from './BlogList'
import Login from './Login'
import { Routes, Route } from 'react-router-dom'
import UserList from './UserList'
import User from './User'

const Home = ({ setError }) => {
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'DELETE' })
  }

  return(
    <div>
      <h2>blogs</h2>
      { user ?
        <div>
          <p>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></p>
          <Routes>
            <Route path='/' element={<BlogList setError={setError} />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div> :
        <Login setError={setError} />}
    </div>
  )
}

export default Home
