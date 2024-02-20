import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/userContext'

const Navbar = () => {
  const [user, userDispatch] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'DELETE' })
  }

  return(
    <div className='navbar'>
      <Link to={'/'}>blogs</Link>
      <Link to={'/users/'}>users</Link>
      <div>{user.name} logged in <button id="logout-btn" onClick={handleLogout}>logout</button></div>
    </div>
  )
}

export default Navbar
