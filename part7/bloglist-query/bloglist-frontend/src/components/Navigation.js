import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/userContext'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
  const [user, userDispatch] = useContext(UserContext)

  const padding = {
    padding: '10px'
  }

  const text= {
    textDecoration: 'none'
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'DELETE' })
  }

  return(
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav style={padding} className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={text} to={'/'}>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={text} to={'/users/'}>users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Text style={padding}>
          {user.name} logged in <Button variant='primary' onClick={handleLogout}>logout</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
