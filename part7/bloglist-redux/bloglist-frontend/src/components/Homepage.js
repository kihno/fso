import { useDispatch, useSelector } from 'react-redux'
import BlogList from '../components/BlogList'
import { setUser } from '../reducers/userReducer'

const Homepage = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button id='logout-btn' onClick={handleLogout}>
          logout
        </button>
      </p>
      <BlogList />
    </div>
  )
}

export default Homepage
