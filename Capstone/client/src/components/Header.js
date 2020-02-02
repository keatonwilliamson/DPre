import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

  let root = document.documentElement;

  function styleWaveVideo(hueRotateDegrees) {
    root.style.setProperty('--wave-greyscale', "0%");
    root.style.setProperty('--wave-opacity', "0.8");
    root.style.setProperty('--wave-hue', `${hueRotateDegrees}deg`);
    console.log("stlye")
  }

  function resetStyleWaveVideo() {
    root.style.setProperty('--wave-greyscale', "100%");
    root.style.setProperty('--wave-opacity', "0.5");
    root.style.setProperty('--wave-hue', `0deg`);
    console.log("un-stlye")
    console.log(props.match)
  }


  return (
    <nav className="header">
      <div className="left-nav-items">
        <img className="moog-header-logo" src={require('../Assets/moog-logo.png')} alt="img" />
        <Link className="d-patch" to="/home">DPatch</Link>
        {/* <p className="d-patch">DPatch</p> */}
        {
          props.user ? (
            <>
              <ul className="center-nav-items">
                <li className="nav-item center-nav-item"
                // onMouseEnter={() => styleWaveVideo(280)}
                // onMouseLeave={resetStyleWaveVideo}
                >
                  <Link to="/Explore">Explore</Link>
                </li>
                <li className="nav-item center-nav-item"
                  onMouseEnter={() => styleWaveVideo(280)}
                  onMouseLeave={resetStyleWaveVideo}>
                  <Link to="/Bank">Bank</Link>
                </li>
                <li className="nav-item center-nav-item"
                  onMouseEnter={() => styleWaveVideo(80)}
                  onMouseLeave={resetStyleWaveVideo}>
                  <Link to="/Design">Design</Link>
                </li>
              </ul>
            </>
          ) : (
              <>
              </>
            )
        }
      </div>

      <ul className="nav-items">

        {
          props.user ? (
            <>
              <li className="nav-item">Hello {props.user.username}</li>
              <li className="nav-item" onClick={() => {
                props.logout()
                props.history.push('/')
              }}>Log out</li>
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