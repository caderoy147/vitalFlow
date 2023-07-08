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
      <h1>Vital Flow</h1>
      </Link>
      <nav>
         {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className = "logIn">Login</Link>
              <Link to="/signup" className = "signUp">Signup</Link>
            </div>
          )}
      </nav>
    </div>
   </header>
  )
}

export default Navbar 