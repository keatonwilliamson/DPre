import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Knob from './Knob'
import HorizontalRocker from './HorizontalRocker';
import OnLabel from './OnLabel';
class Design extends Component {
  state = {
    values: [],
    settings: {
      masterTuneValue: 0,
      oscillatorModulationValue: false,
      filterModulationValue: false
    }
  }

  handleChange = (parameter, newValue) => {
    this.setState({
      settings: {...this.state.settings, [parameter]: newValue }  
    });
    // console.log(`state settings: ${JSON.stringify(this.state.settings)}`)
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

              {/* SECTION LABELS */}
              <p onMouseDown={() => console.log("yeahhh boi", this.state.settings)} className="section-label controllers-label">CONTROLLERS</p>
              <div className="divider controllers-divider"></div>

              <p className="section-label oscillator-label">OSCILLATOR BANK</p>
              <div className="divider oscillator-divider"></div>

              <p className="section-label mixer-label">MIXER</p>
              <div className="divider mixer-divider"></div>

              <p className="section-label modifiers-label">MODIFIERS</p>
              <div className="divider modifiers-divider"></div>

              <p className="section-label output-label">OUTPUT</p>
              <div className="divider output-divider"></div>

              {/* KNOBS */}
              <Knob
                parameter="masterTuneValue"
                currentValue={this.state.settings.masterTuneValue}
                degrees={260}
                min={1}
                max={10}
                value={80}
                onChange={this.handleChange}
              />

              {/* Rockers */}
              <HorizontalRocker parameter="oscillatorModulationValue" uniqueClass={"oscillator-modulation-rocker"} color={"orange"} onChange={this.handleChange}/>
              <OnLabel on={this.state.settings.oscillatorModulationValue} uniqueClass={"oscillator-modulation-on-label"}/>
              <HorizontalRocker parameter="filterModulationValue" uniqueClass={"filter-modulation-rocker"} color={"orange"} onChange={this.handleChange}/>
            </div>
            <div></div>
          </div>
        </div>
      </>
    )
  }
}

export default Design;