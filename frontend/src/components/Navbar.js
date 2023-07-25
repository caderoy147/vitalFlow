import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'
import { createUseStyles } from 'react-jss'


const Navbar = (props) => {

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const styles = createUseStyles({
    navLink: {
      display: 'inline-block',
      padding: '10px 20px',
      color: 'black',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    activeNavLink: {
      color: 'red',
    },
  })

  const activeNavLink = user ? 'Profile' : 'Find Blood'
  const linkPath = user ? '/Profile' : '/Login'

  const drop = user ? null : <ul class="drop">
            <div>
            <li><Link to="/login" className="spanHome" >Login</Link></li>
            <li> <Link to="/signup" className="spanHome">Signup</Link></li>

            </div>
          </ul>

  return (
    
   <header>
    
    <div className="container">
    
      <div className="LinkDiv">
      <Link to="/">
      <div className="HomeLogo">
      </div>
      
      <div classname= "conti1">
      <h1><span className='Vital'> Vital</span>
      <span className='Flow'>Flow</span></h1>
      </div>
      </Link>
      </div>
      <nav>
      
      <ul id="main">
        <li><Link to="/"><span className="spanHome">Home</span></Link></li>
        <li><Link to="/AboutUs"><span className="spanHome">About Us</span></Link></li>
        <li><Link to={linkPath} className="spanHome"> {activeNavLink} </Link>
          {drop}
        </li>
        <li><Link to="/" className="spanHome">Contact</Link></li>
        <div id="marker"></div>
      </ul>
      </nav>
      
      <nav>
         {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
      </nav>
    </div>
   </header>
  )
}

export default Navbar 

