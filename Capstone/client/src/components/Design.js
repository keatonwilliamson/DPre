import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import Knob from '../Knob'
class Design extends Component {
  state = {
    values: [],
    masterTuneValue: 0
  }

  handleChange = (parameter, newValue) => {
    console.log(`${parameter} is set at ${newValue}`)
    this.setState({
      masterTuneValue: newValue
    });
  };

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

              <Knob
                parameter="masterTuneValue"
                currentValue={this.state.masterTuneValue}
                degrees={260}
                min={1}
                max={10}
                value={80}
                onChange={this.handleChange}
              />
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