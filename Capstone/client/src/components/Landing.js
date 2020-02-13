import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';

class Landing extends Component {

  componentDidMount() {
    if (this.props.user) this.props.history.push('/home');
    let root = document.documentElement;
    root.addEventListener("mousemove", e => {
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const xOffset = Math.floor(20 * ((vw/2) - e.clientX)/(vw/2))
      const yOffset = Math.floor(20 * ((vh/2) - e.clientY)/(vh/2))
      console.log(xOffset, yOffset)
      root.style.setProperty('--cyan-x', -xOffset + "px");
      root.style.setProperty('--cyan-y', -yOffset + "px");
      root.style.setProperty('--magenta-x', xOffset + "px");
      root.style.setProperty('--magenta-y', yOffset + "px");
    });
    // const authHeader = createAuthHeaders();
    // fetch('/api/v1/values', {
    //   headers: authHeader
    // })
    //   .then(response => response.json())
    //   .then(values => {
    //     this.setState({ values: values });
    //   });
  }

  render() {
    return (
      <>
        {/* <h1>Landing Page WOOOOOO</h1> */}

        <div className="landing-background">
          <div className="jumbotron-wrapper">
             <p className="jumbotron">save your minimoog patches.</p>
          </div>
          <img className="landing-minimoog" src={require('../Assets/minimoog-transparent-landing.png')} alt="img" />
        </div>
        <ul>
          {/* {
            this.state.values.map(value => <li>{value}</li>)
          } */}
        </ul>
      </>
    )
  }
}

export default Landing;