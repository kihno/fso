import { useContext } from 'react'
import UserContext from '../context/userContext'
import BlogList from './BlogList'
import Login from './Login'

const Home = ({ setError }) => {
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'DELETE' })
  }

  const Header = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></p>
        <BlogList setError={setError} />
      </div>
    )
  }

  return(
    <div>
      { user ?
        <Header /> :
        <Login setError={setError} />}
    </div>
  )
}

export default Home
