import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Link} from 'react-router-dom'
 
import './Navbar.scss'

const Navbar = () => {
  const {logout, isLogin} = useContext(AuthContext)
  
    return(
      <div>
        <nav>
    <div className="nav-wrapper navbar blue">
      <Link to="/" className="brand-logo">Shared TODOs</Link>
      <Link to="#" className="sidenav-trigger" data-target="mobile-demo">
			<i className="material-icons">menu</i>
		</Link>
      {
        isLogin
        ? 
        
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/dashboard">Personal Tasks</Link></li>
          <li><Link to="/sharedtasks">Group Tasks</Link></li>
          <li><Link to="/groups">My groups</Link></li>
          <li><Link to="/allgroups">All groups</Link></li>
          <li><Link to="/" onClick={logout}>Logout</Link></li>
          </ul>
           
          
          :
          <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Login</Link></li>
      </ul>
      }
     
    </div>

  </nav>
  {
        isLogin
        ? 
  <ul className="sidenav" id="mobile-demo">
	        <li><Link to="/dashboard">Personal Tasks</Link></li>
          <li><Link to="/sharedtasks">Group Tasks</Link></li>
          <li><Link to="/groups">My groups</Link></li>
          <li><Link to="/allgroups">All groups</Link></li>
          <li><Link to="/" onClick={logout}>Logout</Link></li>
</ul>:  <ul className="sidenav" id="mobile-demo"> <li><Link to="/">Login</Link></li></ul>
}
</div>
    );
}

export default Navbar;