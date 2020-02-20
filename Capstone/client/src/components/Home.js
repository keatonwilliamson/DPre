import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';

class Home extends Component {

  componentDidMount() {
    if (this.props.user) this.props.history.push('/home');
    let root = document.documentElement;
    root.addEventListener("mousemove", this.animateDropShadows);
  }
    animateDropShadows = (e) => {
      let root = document.documentElement;
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const xOffset = Math.floor(20 * ((vw/2) - e.clientX)/(vw/2))
      const yOffset = Math.floor(20 * ((vh/2) - e.clientY)/(vh/2))
      root.style.setProperty('--cyan-x', -xOffset + "px");
      root.style.setProperty('--cyan-y', -yOffset + "px");
      root.style.setProperty('--magenta-x', xOffset + "px");
      root.style.setProperty('--magenta-y', yOffset + "px");
    }

  componentWillUnmount() {
    let root = document.documentElement;
    root.removeEventListener("mousemove", this.animateDropShadows)
  }

  render() {
    return (
      <>
        <div className="landing-background">
          <div className="jumbotron-wrapper">
             <p className="jumbotron">save your minimoog patches.</p>
          </div>
          <img className="landing-minimoog" src={require('../Assets/minimoog-transparent-landing.png')} alt="img" />
        </div>
        <ul>
        </ul>
      </>
    )
  }
}

export default Home;










// import React, { Component } from 'react';
// import { createAuthHeaders } from '../API/userManager';
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
// // import cloudinary from 'cloudinary';

// class Home extends Component {
//   state = {
//     values: [],
//   }

//   componentDidMount() {
//     const authHeader = createAuthHeaders();
//     fetch('/api/v1/values', {
//       headers: authHeader
//     })
//       .then(response => response.json())
//       .then(values => {
//         this.setState({ values: values });
//       });
//   }

//   render() {
//     return (
//       <>
//         <div style={{width: '100%'}} className="home-wrapper">
//           {/* <Video style={{}}width="600" cloudName="cloudinarykeaton" publicId="Waveforms" crop="scale" controls={false} autoPlay={true} loop={true} fluid="true" id="example-player">
//           </Video> */}
//         </div>
//       </>
//     )
//   }
// }

// export default Home;