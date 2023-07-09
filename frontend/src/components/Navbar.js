import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
   <header>
    <div className="container">
      <Link to='/'>
      <h1><span className='Vital'>Vital</span>
      <span className='Flow'>Flow</span></h1>
      </Link>
      <ul className = "navi">
        <li>Volunteer</li>
        <li>Donate</li>
        <Link to="/profile">Profile</Link>
        <li>About us</li>
        </ul>
      <nav>
         {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className='logIn'>Login</Link>
              <Link to="/signup"className='signUp'>Signup</Link>
            </div>
          )}
      </nav>
    </div>
   </header>
  )
}

export default Navbar 
//hi