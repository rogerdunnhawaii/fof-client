import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
    <Link to="/my-posts">My Posts</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/about">About</Link>
  </React.Fragment>
)

const Header = ({ user, isHome, isNewPost }) => (
  <header className="main-header">
    <h3>FOF | Boston</h3>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { isHome || <Link to="/">Home Page</Link> }
      { isNewPost && <Link to="/create-post">New Post</Link> }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header