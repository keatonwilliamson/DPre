import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

class Design extends Component {
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
        <div className="design-background">

        </div>
      </>
    )
  }
}

export default Design;