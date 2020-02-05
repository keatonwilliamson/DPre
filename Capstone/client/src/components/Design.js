import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Knob from './Knob'
import HorizontalRocker from './HorizontalRocker';
import OnLabel from './OnLabel';
import Dial from './Dial';
import LabelGroup from './LabelGroup';
class Design extends Component {
  state = {
    values: [],
    settings: {
      masterTuneValue: [0, 30],
      glideValue: [0, 30],
      modulationMixValue: [10, 330],
      modulationSourceA: false,
      modulationSourceB: false,
      oscillatorModulationValue: false,
      oscillator3ControlValue: false,
    }
  }

  handleRockerChange = (parameter, newValue) => {
    this.setState({
      settings: { ...this.state.settings, [parameter]: newValue }
    });
  };
  handleKnobChange = (parameter, newValue, currentDegrees) => {
    this.setState({
      settings: { ...this.state.settings, [parameter]: newValue }
    });
    console.log(currentDegrees)
  };

  modulationMixLabelFadeAmount = () => {
    return this.state.settings.modulationMixValue - 5
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

              {/* SECTIONS */}
              <p onMouseDown={() => console.log("yeahhh boi", this.state.settings)} className="section-label controllers-label">CONTROLLERS</p>
              <div className="divider controllers-divider-top"></div>
              <div className="divider controllers-divider-bottom"></div>

              <p className="section-label oscillator-label">OSCILLATOR BANK</p>
              <div className="divider oscillator-divider"></div>

              <p className="section-label mixer-label">MIXER</p>
              <div className="divider mixer-divider"></div>

              <p className="section-label modifiers-label">MODIFIERS</p>
              <div className="divider modifiers-divider"></div>

              <p className="section-label output-label">OUTPUT</p>
              <div className="divider output-divider"></div>

              {/* DIALS */}
              <Dial zeroCentered={true} multiplier={1} uniqueClass={"master-tune-dial"} />
              <Dial uniqueClass={"glide-dial"} />
              <Dial modulationMix={true} uniqueClass={"modulation-mix-dial"} />

              {/* KNOBS */}
              <Knob
                masterTune={true}
                uniqueClass={"master-tune-knob"}
                parameter="masterTuneValue"
                // currentValue={this.state.settings.masterTuneValue}
                degrees={300}
                min={1}
                max={10}
                value={this.state.settings.masterTuneValue[1]}
                onChange={this.handleKnobChange}
              />
              <Knob
                uniqueClass={"glide-knob"}
                parameter="glideValue"
                // currentValue={this.state.settings.glideValue}
                degrees={300}
                min={1}
                max={10}
                value={this.state.settings.glideValue[1]}
                onChange={this.handleKnobChange}
              />
              <Knob
                uniqueClass={"modulation-mix-knob"}
                parameter="modulationMixValue"
                // currentValue={this.state.settings.modulationMixValue}
                degrees={300}
                min={1}
                max={10}
                value={this.state.settings.modulationMixValue[1]}
                onChange={this.handleKnobChange}
              />

              {/* Rockers */}
              <HorizontalRocker parameter="modulationSourceA" uniqueClass={"modulation-source-a-rocker"} color={"black"} onChange={this.handleRockerChange} />
              <HorizontalRocker parameter="modulationSourceB" uniqueClass={"modulation-source-b-rocker"} color={"black"} onChange={this.handleRockerChange} />

              <HorizontalRocker parameter="oscillatorModulationValue" uniqueClass={"oscillator-modulation-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillatorModulationValue} uniqueClass={"oscillator-modulation-on-label"} />


              <HorizontalRocker parameter="oscillator3ControlValue" uniqueClass={"oscillator-3-control-rocker"} color={"orange"} onChange={this.handleRockerChange} />

              {/* Labels */}
              <LabelGroup />
              <p style={{filter: `opacity(${this.state.settings.modulationSourceA ? 0.2 : 1})`}} className="modulation-mix-sub-label modulation-mix-rocker-label-osc-3">OSC. 3</p>
              <p style={{filter: `opacity(${this.state.settings.modulationSourceA ? 1 : 0.2})`}}className="modulation-mix-sub-label modulation-mix-rocker-label-filter-eg">FILTER EG</p>
              <p style={{filter: `opacity(${this.state.settings.modulationSourceB ? 0.2 : 1})`}}className="modulation-mix-sub-label modulation-mix-rocker-label-noise">NOISE</p>
              <p style={{filter: `opacity(${this.state.settings.modulationSourceB ? 1 : 0.2})`}}className="modulation-mix-sub-label modulation-mix-rocker-label-lfo">LFO</p>



              <div className="measuring-tape"></div>
            </div>
            <div></div>
          </div>
        </div>
      </>
    )
  }
}

export default Design;