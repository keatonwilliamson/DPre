import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Knob from './Knob'
import Pointer from './Pointer'
import HorizontalRocker from './HorizontalRocker';
import OnLabel from './OnLabel';
import Dial from './Dial';
import PointerDial from './PointerDial';
import LabelGroup from './LabelGroup';
class Design extends Component {
  state = {
    values: [],
    settings: {
      masterTuneValue: [0, 180],
      glideValue: [0, 30],
      modulationMixValue: [5, 180],
      modulationSourceA: true,
      modulationSourceB: true,
      oscillatorModulationValue: false,
      oscillator3ControlValue: true,
      oscillator1RangeValue: ["32'", 135],
      oscillator2RangeValue: ["16'", 165],
      oscillator3RangeValue: ["16'", 165],
      oscillator1WaveformValue: ["32'", 135],
      oscillator2WaveformValue: ["16'", 165],
      oscillator3WaveformValue: ["16'", 165],
    }
  }

  handleRockerChange = (parameter, newValue) => {
    this.setState({
      settings: { ...this.state.settings, [parameter]: newValue }
    });
  };
  handleKnobChange = (parameter, newValue, currentDegrees) => {
    this.setState({
      settings: { ...this.state.settings, [parameter]: [newValue, currentDegrees] }
    });
  };
  handlePointerChange = (parameter, newValue, currentDegrees) => {
    this.setState({
      settings: { ...this.state.settings, [parameter]: [newValue, currentDegrees] }
    });
  };

  modulationMixLabelFadeAmount = () => {
    return ((this.state.settings.modulationMixValue[1] - 180) / 188)
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

              <PointerDial uniqueClass={"oscillator-1-range-dial"}/>
              <PointerDial uniqueClass={"oscillator-1-waveform-dial"} waveforms={true} />
              <PointerDial uniqueClass={"oscillator-2-range-dial"}/>
              <PointerDial uniqueClass={"oscillator-2-waveform-dial"} waveforms={true} />
              <PointerDial uniqueClass={"oscillator-3-range-dial"}/>
              <PointerDial uniqueClass={"oscillator-3-waveform-dial"} waveforms={true} />

              {/* KNOBS */}
              <Knob
                masterTune={true}
                uniqueClass={"master-tune-knob"}
                parameter="masterTuneValue"
                currentValue={this.state.settings.masterTuneValue[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={180}
                onChange={this.handleKnobChange}
              />
              <Knob
                uniqueClass={"glide-knob"}
                parameter="glideValue"
                currentValue={this.state.settings.glideValue[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.glideValue[1]}
                onChange={this.handleKnobChange}
              />
              <Knob
                uniqueClass={"modulation-mix-knob"}
                parameter="modulationMixValue"
                currentValue={this.state.settings.modulationMixValue[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.modulationMixValue[1]}
                onChange={this.handleKnobChange}
              />

              <Pointer
                uniqueClass={"oscillator-1-range-pointer"}
                parameter="oscillator1RangeValue"
                currentValue={this.state.settings.oscillator1RangeValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator1RangeValue[1]}
                onChange={this.handlePointerChange}
              />
              <Pointer
                uniqueClass={"oscillator-1-waveform-pointer"}
                parameter="oscillator1WaveformValue"
                currentValue={this.state.settings.oscillator1WaveformValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator1WaveformValue[1]}
                onChange={this.handlePointerChange}
              />
              <Pointer
                uniqueClass={"oscillator-2-range-pointer"}
                parameter="oscillator2RangeValue"
                currentValue={this.state.settings.oscillator2RangeValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator2RangeValue[1]}
                onChange={this.handlePointerChange}
              />
              <Pointer
                uniqueClass={"oscillator-2-waveform-pointer"}
                parameter="oscillator2WaveformValue"
                currentValue={this.state.settings.oscillator2WaveformValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator2WaveformValue[1]}
                onChange={this.handlePointerChange}
              />
              <Pointer
                uniqueClass={"oscillator-3-range-pointer"}
                parameter="oscillator3RangeValue"
                currentValue={this.state.settings.oscillator3RangeValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator3RangeValue[1]}
                onChange={this.handlePointerChange}
              />
              <Pointer
                uniqueClass={"oscillator-3-waveform-pointer"}
                parameter="oscillator3WaveformValue"
                currentValue={this.state.settings.oscillator3WaveformValue[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator3WaveformValue[1]}
                onChange={this.handlePointerChange}
              />



              {/* Rockers */}
              <HorizontalRocker on={this.state.settings.modulationSourceA} parameter="modulationSourceA" uniqueClass={"modulation-source-a-rocker"} color={"black"} onChange={this.handleRockerChange} />
              <HorizontalRocker on={this.state.settings.modulationSourceB} parameter="modulationSourceB" uniqueClass={"modulation-source-b-rocker"} color={"black"} onChange={this.handleRockerChange} />

              <HorizontalRocker on={this.state.settings.oscillatorModulationValue} parameter="oscillatorModulationValue" uniqueClass={"oscillator-modulation-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillatorModulationValue} uniqueClass={"oscillator-modulation-on-label"} />


              <HorizontalRocker on={this.state.settings.oscillator3ControlValue} parameter="oscillator3ControlValue" uniqueClass={"oscillator-3-control-rocker"} color={"orange"} onChange={this.handleRockerChange} />

              {/* Labels */}
              <LabelGroup />
              <p style={{ filter: `opacity(${1 - this.modulationMixLabelFadeAmount()})` }} className="modulation-mix-sub-label modulation-mix-knob-label-osc-3">OSC. 3/</p>
              <p style={{ filter: `opacity(${1 - this.modulationMixLabelFadeAmount()})` }} className="modulation-mix-sub-label modulation-mix-knob-label-filter-eg">FILTER EG</p>
              <p style={{ filter: `opacity(${1 + this.modulationMixLabelFadeAmount()})` }} className="modulation-mix-sub-label modulation-mix-knob-label-noise">NOISE /</p>
              <p style={{ filter: `opacity(${1 + this.modulationMixLabelFadeAmount()})` }} className="modulation-mix-sub-label modulation-mix-knob-label-lfo">LFO</p>


              <p style={{ filter: `opacity(${this.state.settings.modulationSourceA ? 0.2 : 1})` }} className="modulation-mix-sub-label modulation-mix-rocker-label-osc-3">OSC. 3</p>
              <p style={{ filter: `opacity(${this.state.settings.modulationSourceA ? 1 : 0.2})` }} className="modulation-mix-sub-label modulation-mix-rocker-label-filter-eg">FILTER EG</p>
              <p style={{ filter: `opacity(${this.state.settings.modulationSourceB ? 0.2 : 1})` }} className="modulation-mix-sub-label modulation-mix-rocker-label-noise">NOISE</p>
              <p style={{ filter: `opacity(${this.state.settings.modulationSourceB ? 1 : 0.2})` }} className="modulation-mix-sub-label modulation-mix-rocker-label-lfo">LFO</p>

              <p style={{ filter: `opacity(${this.state.settings.oscillator3ControlValue ? 1 : 0.2})` }} className="modulation-mix-sub-label oscillator-3-control-rocker-label">OSC. 3</p>
              <p style={{ filter: `opacity(${this.state.settings.oscillator3ControlValue ? 1 : 0.2})` }} className="modulation-mix-sub-label oscillator-3-control-rocker-label-control">CONTROL</p>


               {/* <div className="waveforms-border">

                <div className="triangle-wave-border">
                  <div className="triangle-wave-1"></div>
                  <div className="triangle-wave-2"></div>
                </div>

                <div className="triangle-saw-wave-border">
                  <div className="triangle-saw-wave-1"></div>
                  <div className="triangle-saw-wave-2"></div>
                  <div className="triangle-saw-wave-3"></div>
                </div>

                <div className="saw-wave-border">
                  <div className="saw-wave-1"></div>
                  <div className="saw-wave-2"></div>
                </div>

                <div className="square-wave-border">
                  <div className="square-wave-1"></div>
                  <div className="square-wave-2"></div>
                  <div className="square-wave-3"></div>
                  <div className="square-wave-4"></div>
                </div>

                <div className="pulse-wave-border">
                  <div className="pulse-wave-1"></div>
                  <div className="pulse-wave-2"></div>
                  <div className="pulse-wave-3"></div>
                  <div className="pulse-wave-4"></div>
                </div>

                <div className="small-pulse-wave-border">
                  <div className="small-pulse-wave-1"></div>
                  <div className="small-pulse-wave-2"></div>
                  <div className="small-pulse-wave-3"></div>
                  <div className="small-pulse-wave-4"></div>
                </div>

              </div>  */}


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