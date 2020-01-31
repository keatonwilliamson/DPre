import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <nav className="header">
      <div className="left-nav-items">
      <img className="moog-header-logo" src={require('../Assets/moog-logo.png')} alt="img" />
      <p className="d-patch">DPatch</p>
      </div>
      <ul className="nav-items">

        {
          props.user ? (
            <>
              <li className="nav-item">Hello {props.user.username}</li>
              <li className="nav-item" onClick={props.logout}>Log out</li>
            </>
          ) : (
              <>
                <li className="nav-item log-in">
                  <Link to="/login">Log in</Link>
                </li>
                <li className="nav-item sign-up">
                  <Link to="/register">Sign up</Link>
                </li>
              </>
            )
        }
      </ul>
    </nav>
  )
}

export default Header;