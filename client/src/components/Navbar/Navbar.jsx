import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './Navbar.scss'

const Navbar = () => {
  const {logout, isLogin} = useContext(AuthContext)
  
    return(
        <nav>
    <div className="nav-wrapper navbar blue">
      <a href="/" className="brand-logo">Shared TODOs</a>
      {
        isLogin
        ? <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/dashboard">Personal Tasks</a></li>
          <li><a href="/sharedtasks">Group Tasks</a></li>
          <li><a href="/groups">My groups</a></li>
          <li><a href="/allgroups">All groups</a></li>
          <li><a href="/" onClick={logout}>Logout</a></li>
          </ul>
          
          :
          <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><a href="/">Login</a></li>
      </ul>
      }
    </div>
  </nav>
    );
}

export default Navbar;