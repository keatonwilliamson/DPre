import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
// import cloudinary from 'cloudinary';

class Home extends Component {
  state = {
    values: [],
  }

  componentDidMount() {
    const authHeader = createAuthHeaders();
    fetch('/api/v1/values', {
      headers: authHeader
    })
      .then(response => response.json())
      .then(values => {
        this.setState({ values: values });
      });
  }

  render() {
    return (
      <>
        <div className="home-wrapper">
          <Video width="600" cloudName="cloudinarykeaton" publicId="Waveforms" crop="scale" controls={false} autoPlay={true} loop={true} fluid="true" id="example-player">
          </Video>
        </div>
      </>
    )
  }
}

export default Home;