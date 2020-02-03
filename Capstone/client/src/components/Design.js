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
        <div className="design-background"></div>
        <div className="design-view">
          <div className="sliding-grid">
            <div></div>
            <div className="panel">

              <p className="section-label controllers-label">CONTROLLERS</p>
              <div className="divider controllers-divider"></div>

              <p className="section-label oscillator-label">OSCILLATOR BANK</p>
              <div className="divider oscillator-divider"></div>

              <p className="section-label mixer-label">MIXER</p>
              <div className="divider mixer-divider"></div>

              <p className="section-label modifiers-label">MODIFIERS</p>
              <div className="divider modifiers-divider"></div>

              <p className="section-label output-label">OUTPUT</p>
              <div className="divider output-divider"></div>
            </div>
            <div></div>
          </div>
        </div>
      </>
    )
  }
}

export default Design;