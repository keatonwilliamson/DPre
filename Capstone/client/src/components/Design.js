import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Knob from './Knob'
import Pointer from './Pointer'
import HorizontalRocker from './HorizontalRocker';
import OnLabel from './OnLabel';
import Dial from './Dial';
import OscillatorDial from './OscillatorDial';
import PointerDial from './PointerDial';
import LabelGroup from './LabelGroup';
import SaveConfirmationModal from './SaveConfirmationModal';
import UpdateConfirmationModal from './UpdateConfirmationModal';
import InputJack from './InputJack';
import PowerLight from './PowerLight';
import presetsManger from '../API/presetsManager';
import { getUser, removeUser } from '../API/userManager';
import SidebarItems from './SidebarItems';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'
import { debounce } from 'lodash';
class Design extends Component {
  constructor(props) {
    super(props);
    this.slidingGrid = React.createRef();
    this.sidebar = React.createRef();
  }

  state = {
    loaded: false,
    saveConfirmation: false,
    formIsVisible: true,
    sidebarLoaded: false,
    reloadControls: false,
    pageEnd: false,
    sidebarIsPinned: false,
    bank: [],
    settings: {
      id: null,
      userId: null,
      userName: "",
      masterTune: [0, 180],
      glideAmount: [0, 30],
      modulationMix: [5, 180],
      modulationSourceA: true,
      modulationSourceB: true,
      oscillatorModulation: false,
      oscillator3Control: true,
      oscillator1Range: ["32'", 135],
      oscillator2Range: ["16'", 165],
      oscillator3Range: ["16'", 165],
      oscillator2Frequency: [0, 180],
      oscillator3Frequency: [0, 180],
      oscillator1Waveform: ["saw", 165],
      oscillator2Waveform: ["saw", 165],
      oscillator3Waveform: ["saw", 165],
      oscillator1Volume: [5, 180],
      oscillator2Volume: [5, 180],
      oscillator3Volume: [5, 180],
      oscillator1: true,
      oscillator2: false,
      oscillator3: false,
      externalInput: false,
      noise: false,
      externalInputVolume: [0, 30],
      noiseVolume: [0, 30],
      noiseColor: true,
      filterModulation: false,
      keyboardControl1: false,
      keyboardControl2: false,
      filterCutoff: [0, 30],
      filterEmphasis: [0, 30],
      filterContour: [0, 30],
      filterAttack: [0, 30],
      filterDecay: [0, 30],
      filterSustain: [0, 30],
      loudnessAttack: [0, 30],
      loudnessDecay: [0, 30],
      loudnessSustain: [0, 30],
      mainOutputVolume: [0, 30],
      mainOutput: false,
      tuner: false,
      phonesOutputVolume: [0, 30],
      power: false,
      lfoRate: [0, 30],
      glide: false,
      decay: false,
      pitchWheel: 50,
      modWheel: 50,
      presetName: "",
      presetNotes: "",
      dateCreated: null,
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

  handleSliderChange = (event) => {
    this.setState({
      settings: { ...this.state.settings, [event.target.id]: parseInt(event.target.value) }
    });
  };

  handleTextInputChange(event) {
    let textInputValue = (event.target.name === "presetName") ? event.target.value.toUpperCase() : event.target.value
    this.setState({
      settings: { ...this.state.settings, [event.target.name]: textInputValue }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.renderSavingLoader();
    this.closeSaveModal();
    presetsManger.postPreset(this.state.settings)
      .then(response => {
        this.props.history.push(`/preset/${response.id}`)
        this.renderPreset();
        this.getBank();
      });
  }

  handleUpdate = (event) => {
    event.preventDefault();
    this.props.renderSavingLoader();
    this.closeSaveModal();
    presetsManger.editPreset(this.state.settings)
      .then(response => {
        this.props.history.push(`/preset/${this.state.settings.id}`)
        this.renderPreset();
        this.getBank();
      });
  }

  handleScrollLocally = debounce(() => {
    if (Math.max((this.props.scroll, this.slidingGrid.current.scrollLeft) > 3080) && (this.state.pageEnd == false)) {
      if (this.props.sidebarIsVisible) this.setState({ sidebarIsPinned: true })
      this.props.showSidebar();
      this.setState({ pageEnd: true });
    }
    if (Math.max((this.props.scroll, this.slidingGrid.current.scrollLeft) < 3080) && (this.state.pageEnd == true) && !this.state.sidebarIsPinned) {
      this.props.hideSidebar();
      this.setState({ pageEnd: false });
    }
  }, 20)

  pinSidebar = () => {
    this.setState({ sidebarIsPinned: true })
  }
  unpinSidebar = () => {
    this.setState({ sidebarIsPinned: false })
  }

  modulationMixLabelFadeAmount = () => {
    return ((this.state.settings.modulationMix[1] - 180) / 188)
  };

  closeSaveModal = () => {
    this.setState({ saveConfirmation: false });
  }
  openSaveModal = () => {
    this.setState({ saveConfirmation: true });
    this.hideForm();
  }

  hideForm = () => {
    this.setState({ formIsVisible: false });
  }
  showForm = () => {
    this.setState({ formIsVisible: true });
  }

  renderPreset = () => {
    if (this.props.presetId) {
      presetsManger.getPreset(this.props.presetId)
        .then(preset => {
          this.setState({ settings: preset });
          this.closeSavingLoader();
        });
    }
  }

  renderPresetFromSideBar = (preset) => {
    this.props.history.push(`/preset/${preset.id}`)
    this.setState({ settings: preset, reloadControls: !this.state.reloadControls });
  }

  getBank = () => {
    presetsManger.getBank()
      .then(bank => {
        this.setState({ bank: bank });
      })
  }

  closeSidebarLoader = debounce(() => {
    this.setState({ sidebarLoaded: true });
  }, 1000);

  closeSavingLoader = debounce(() => {
    this.props.closeSavingLoader();
    this.showForm();
  }, 1000);

  componentDidMount() {
    this.slidingGrid.current.scrollLeft = this.props.scroll;
    this.renderPreset();
    this.getBank();
    this.closeSidebarLoader();
  }

  setSidebarScroll() {
    this.sidebar.current.ref.current.scrollTop = this.props.sidebarScroll;
  }

  render() {
    return (
      <>
        <div className="design-background"></div>
        <div style={{ zIndex: 5, position: 'fixed', right: 0 }}>
          <Icon style={{ position: 'absolute', right: 16, top: 16, backgroundColor: 'rgb(16, 16, 16,.9)' }} circular inverted name='ellipsis horizontal' size='large'
            onClick={() => {
              this.setState({ sidebarIsPinned: true })
              this.props.showSidebar()
            }} />
          <SidebarItems displayScroll={5} sidebarIsVisible={this.props.sidebarIsVisible} sidebarIsDisplayed={this.props.sidebarIsDisplayed} hideSidebar={this.props.hideSidebar} cleanupSidebar={this.props.cleanupSidebar} bank={this.state.bank} sidebarLoaded={this.state.sidebarLoaded} renderPresetFromSideBar={this.renderPresetFromSideBar} unpinSidebar={this.unpinSidebar} pinSidebar={this.pinSidebar} sidebarIsPinned={this.state.sidebarIsPinned} pageEnd={this.state.pageEnd} {...this.props} />
        </div>
        <div ref={this.slidingGrid} onScroll={() => {
          this.props.handleScroll(this.slidingGrid.current.scrollLeft)
          this.handleScrollLocally()
        }} className="design-view">
          <div className="sliding-grid">
            <div className="modulation-panel-container">
              <div className="modulation-panel">
                <Dial uniqueClass={"lfo-rate-dial"} />
                <Knob
                  uniqueClass={"lfo-rate-knob"}
                  parameter="lfoRate"
                  currentValue={this.state.settings.lfoRate[0]}
                  degrees={300}
                  min={0}
                  max={10}
                  initialDegreeValue={this.state.settings.lfoRate[1]}
                  onChange={this.handleKnobChange}
                  reloadControls={this.state.reloadControls}
                />

                <HorizontalRocker on={this.state.settings.glide} parameter="glide" uniqueClass={"glide-rocker"} color={"orange"} onChange={this.handleRockerChange} />
                <OnLabel on={this.state.settings.glide} uniqueClass={"glide-on-label"} />

                <HorizontalRocker on={this.state.settings.decay} parameter="decay" uniqueClass={"decay-rocker"} color={"orange"} onChange={this.handleRockerChange} />
                <OnLabel on={this.state.settings.decay} uniqueClass={"decay-on-label"} />

                <div className="pitch-wheel-container" style={{ top: 310, left: 0 }}>
                  <input type="range" min="1" max="100" value="50" id="pitchWheel" className="pitch-wheel"
                    value={this.state.settings.pitchWheel}
                    onChange={this.handleSliderChange}
                    style={{ width: 228, height: 24 }} />
                </div>

                <div className="mod-wheel-container" style={{ top: 310, left: 130 }}>
                  <input type="range" min="1" max="100" value="50" id="modWheel" className="mod-wheel"
                    value={this.state.settings.modWheel}
                    onChange={this.handleSliderChange}
                    style={{ width: 228, height: 24 }}
                  />
                </div>

              </div>
            </div>
            <div className="panel">

              {/* SECTIONS */}
              <p onMouseDown={() => {
              }} className="section-label controllers-label">CONTROLLERS</p>
              <div className="divider controllers-divider-top"></div>
              <div className="divider controllers-divider-bottom"></div>

              <p className="section-label oscillator-label">OSCILLATOR BANK</p>
              <div className="divider oscillator-divider"></div>

              <p className="section-label mixer-label">MIXER</p>
              <div style={{ height: 67, top: 0 }} className="divider mixer-divider"></div>
              <div style={{ height: 50, top: 140 }} className="divider mixer-divider"></div>
              <div style={{ height: 333, top: 300 }} className="divider mixer-divider"></div>

              <p className="section-label modifiers-label">MODIFIERS</p>
              <div className="divider modifiers-divider"></div>

              <div className="horizontal-modifiers-divider"></div>


              <p className="section-label output-label">OUTPUT</p>
              <div className="divider output-divider"></div>

              {/* DIALS */}
              <Dial zeroCentered={true} multiplier={1} uniqueClass={"master-tune-dial"} />
              <Dial uniqueClass={"glide-dial"} />
              <Dial modulationMix={true} uniqueClass={"modulation-mix-dial"} />

              <PointerDial uniqueClass={"oscillator-1-range-dial"} />
              <PointerDial uniqueClass={"oscillator-1-waveform-dial"} waveforms={true} />
              <PointerDial uniqueClass={"oscillator-2-range-dial"} />
              <PointerDial uniqueClass={"oscillator-2-waveform-dial"} waveforms={true} />
              <PointerDial uniqueClass={"oscillator-3-range-dial"} />
              <PointerDial uniqueClass={"oscillator-3-waveform-dial"} waveforms={true} />

              <OscillatorDial uniqueClass={"oscillator-2-frequency-dial"} />
              <OscillatorDial uniqueClass={"oscillator-3-frequency-dial"} />

              <Dial uniqueClass={"oscillator-1-volume-dial"} />
              <Dial uniqueClass={"oscillator-2-volume-dial"} />
              <Dial uniqueClass={"oscillator-3-volume-dial"} />

              <Dial uniqueClass={"external-input-volume-dial"} />
              <Dial uniqueClass={"noise-volume-dial"} />

              <Dial zeroCentered={true} multiplier={2} uniqueClass={"filter-cutoff-dial"} />
              <Dial uniqueClass={"filter-emphasis-dial"} />
              <Dial uniqueClass={"filter-contour-dial"} />
              <Dial uniqueClass={"filter-attack-dial"} />
              <Dial uniqueClass={"filter-decay-dial"} />
              <Dial uniqueClass={"filter-sustain-dial"} />
              <Dial uniqueClass={"loudness-attack-dial"} />
              <Dial uniqueClass={"loudness-decay-dial"} />
              <Dial uniqueClass={"loudness-sustain-dial"} />

              <Dial uniqueClass={"main-output-volume-dial"} />
              <Dial uniqueClass={"phones-output-volume-dial"} />



              {/* KNOBS */}
              <Knob
                zeroCentered={true}
                uniqueClass={"master-tune-knob"}
                parameter="masterTune"
                currentValue={this.state.settings.masterTune[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.masterTune[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"glide-amount-knob"}
                parameter="glideAmount"
                currentValue={this.state.settings.glideAmount[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.glideAmount[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"modulation-mix-knob"}
                parameter="modulationMix"
                currentValue={this.state.settings.modulationMix[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.modulationMix[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />

              <Knob
                oscillatorFrequency={true}
                uniqueClass={"oscillator-2-frequency-knob"}
                parameter="oscillator2Frequency"
                currentValue={this.state.settings.oscillator2Frequency[0]}
                degrees={320}
                min={0}
                max={16}
                initialDegreeValue={this.state.settings.oscillator2Frequency[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />

              <Knob
                oscillatorFrequency={true}
                uniqueClass={"oscillator-3-frequency-knob"}
                parameter="oscillator3Frequency"
                currentValue={this.state.settings.oscillator3Frequency[0]}
                degrees={320}
                min={0}
                max={16}
                initialDegreeValue={this.state.settings.oscillator3Frequency[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />

              {/* oscillator volume knobs */}
              <Knob
                uniqueClass={"oscillator-1-volume-knob"}
                parameter="oscillator1Volume"
                currentValue={this.state.settings.oscillator1Volume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.oscillator1Volume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"oscillator-2-volume-knob"}
                parameter="oscillator2Volume"
                currentValue={this.state.settings.oscillator2Volume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.oscillator2Volume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"oscillator-3-volume-knob"}
                parameter="oscillator3Volume"
                currentValue={this.state.settings.oscillator3Volume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.oscillator3Volume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />

              <Knob
                uniqueClass={"external-input-volume-knob"}
                parameter="externalInputVolume"
                currentValue={this.state.settings.externalInputVolume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.externalInputVolume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"noise-volume-knob"}
                parameter="noiseVolume"
                currentValue={this.state.settings.noiseVolume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.noiseVolume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                zeroCentered={true}
                uniqueClass={"filter-cutoff-knob"}
                parameter="filterCutoff"
                currentValue={this.state.settings.filterCutoff[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterCutoff[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"filter-emphasis-knob"}
                parameter="filterEmphasis"
                currentValue={this.state.settings.filterEmphasis[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterEmphasis[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"filter-contour-knob"}
                parameter="filterContour"
                currentValue={this.state.settings.filterContour[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterContour[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"filter-attack-knob"}
                parameter="filterAttack"
                currentValue={this.state.settings.filterAttack[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterAttack[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"filter-decay-knob"}
                parameter="filterDecay"
                currentValue={this.state.settings.filterDecay[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterDecay[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"filter-sustain-knob"}
                parameter="filterSustain"
                currentValue={this.state.settings.filterSustain[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.filterSustain[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />


              <Knob
                uniqueClass={"loudness-attack-knob"}
                parameter="loudnessAttack"
                currentValue={this.state.settings.loudnessAttack[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.loudnessAttack[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"loudness-decay-knob"}
                parameter="loudnessDecay"
                currentValue={this.state.settings.loudnessDecay[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.loudnessDecay[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"loudness-sustain-knob"}
                parameter="loudnessSustain"
                currentValue={this.state.settings.loudnessSustain[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.loudnessSustain[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />


              <Knob
                uniqueClass={"main-output-volume-knob"}
                parameter="mainOutputVolume"
                currentValue={this.state.settings.mainOutputVolume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.mainOutputVolume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
                reloadControls={this.state.reloadControls}
              />
              <Knob
                uniqueClass={"phones-output-volume-knob"}
                parameter="phonesOutputVolume"
                currentValue={this.state.settings.phonesOutputVolume[0]}
                degrees={300}
                min={0}
                max={10}
                initialDegreeValue={this.state.settings.phonesOutputVolume[1]}
                onChange={this.handleKnobChange}
                reloadControls={this.state.reloadControls}
              />





              <Pointer
                uniqueClass={"oscillator-1-range-pointer"}
                parameter="oscillator1Range"
                currentValue={this.state.settings.oscillator1Range[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator1Range[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />
              <Pointer
                waveforms={true}
                uniqueClass={"oscillator-1-waveform-pointer"}
                parameter="oscillator1Waveform"
                currentValue={this.state.settings.oscillator1Waveform[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator1Waveform[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />
              <Pointer
                uniqueClass={"oscillator-2-range-pointer"}
                parameter="oscillator2Range"
                currentValue={this.state.settings.oscillator2Range[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator2Range[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />
              <Pointer
                waveforms={true}
                uniqueClass={"oscillator-2-waveform-pointer"}
                parameter="oscillator2Waveform"
                currentValue={this.state.settings.oscillator2Waveform[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator2Waveform[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />
              <Pointer
                uniqueClass={"oscillator-3-range-pointer"}
                parameter="oscillator3Range"
                currentValue={this.state.settings.oscillator3Range[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator3Range[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />
              <Pointer
                waveforms={true}
                uniqueClass={"oscillator-3-waveform-pointer"}
                parameter="oscillator3Waveform"
                currentValue={this.state.settings.oscillator3Waveform[0]}
                degrees={150}
                min={0}
                max={5}
                initialDegreeValue={this.state.settings.oscillator3Waveform[1]}
                onChange={this.handlePointerChange}
                reloadControls={this.state.reloadControls}
              />



              {/* Rockers */}
              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.modulationSourceA} parameter="modulationSourceA" uniqueClass={"modulation-source-a-rocker"} color={"black"} onChange={this.handleRockerChange} />
              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.modulationSourceB} parameter="modulationSourceB" uniqueClass={"modulation-source-b-rocker"} color={"black"} onChange={this.handleRockerChange} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.oscillatorModulation} parameter="oscillatorModulation" uniqueClass={"oscillator-modulation-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillatorModulation} uniqueClass={"oscillator-modulation-on-label"} />


              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.oscillator3Control} parameter="oscillator3Control" uniqueClass={"oscillator-3-control-rocker"} color={"orange"} onChange={this.handleRockerChange} />



              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.oscillator1} parameter="oscillator1" uniqueClass={"oscillator-1-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillator1} uniqueClass={"oscillator-1-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.oscillator2} parameter="oscillator2" uniqueClass={"oscillator-2-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillator2} uniqueClass={"oscillator-2-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.oscillator3} parameter="oscillator3" uniqueClass={"oscillator-3-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.oscillator3} uniqueClass={"oscillator-3-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.externalInput} parameter="externalInput" uniqueClass={"external-input-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.externalInput} uniqueClass={"external-input-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.noise} parameter="noise" uniqueClass={"noise-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.noise} uniqueClass={"noise-on-label"} />




              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.noiseColor} parameter="noiseColor" uniqueClass={"noise-color-rocker"} color={"blue"} onChange={this.handleRockerChange} />




              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.filterModulation} parameter="filterModulation" uniqueClass={"filter-modulation-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.filterModulation} uniqueClass={"filter-modulation-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.keyboardControl1} parameter="keyboardControl1" uniqueClass={"keyboard-control-1-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.keyboardControl1} uniqueClass={"keyboard-control-1-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.keyboardControl2} parameter="keyboardControl2" uniqueClass={"keyboard-control-2-rocker"} color={"orange"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.keyboardControl2} uniqueClass={"keyboard-control-2-on-label"} />



              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.mainOutput} parameter="mainOutput" uniqueClass={"main-output-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.mainOutput} uniqueClass={"main-output-on-label"} />

              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.tuner} parameter="tuner" uniqueClass={"tuner-rocker"} color={"blue"} onChange={this.handleRockerChange} />
              <OnLabel on={this.state.settings.tuner} uniqueClass={"tuner-on-label"} />


              <HorizontalRocker reloadControls={this.state.reloadControls} on={this.state.settings.power} parameter="power" uniqueClass={"power-rocker"} color={"black"} power={true} onChange={this.handleRockerChange} />



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

              <p style={{ filter: `opacity(${this.state.settings.oscillator3Control ? 1 : 0.2})` }} className="modulation-mix-sub-label oscillator-3-control-rocker-label">OSC. 3</p>
              <p style={{ filter: `opacity(${this.state.settings.oscillator3Control ? 1 : 0.2})` }} className="modulation-mix-sub-label oscillator-3-control-rocker-label-control">CONTROL</p>

              <InputJack />
              <PowerLight power={this.state.settings.power} />

              {/* <div className="measuring-tape"></div> */}
            </div>
            <div className="patch-form-container">
              <form style={{ visibility: ((this.state.formIsVisible && !this.props.saving) ? "visible" : "hidden") }} autoComplete='off' className="patch-form">
                <input type="text" name="presetName" className="patch-name-text-input" placeholder={"NEW PRESET NAME"} maxLength="50" value={this.state.settings.presetName} onChange={this.handleTextInputChange.bind(this)} />
                <textarea name="presetNotes" className="patch-notes-text-input" placeholder={"NOTES"} maxLength="500" value={this.state.settings.presetNotes} onChange={this.handleTextInputChange.bind(this)} />
                <button
                  style={{ ...(!this.state.formIsVisible) && { transition: 'all 0s linear' } }}
                  className="patch-form-submit" onClick={this.openSaveModal} type="button">SAVE</button>
              </form>
            </div>
          </div>
        </div>

        {this.state.saveConfirmation &&
          ((this.props.presetId && this.state.settings.userName === getUser().username) ? (
            <UpdateConfirmationModal handleUpdate={this.handleUpdate} handleSubmit={this.handleSubmit} closeSaveModal={this.closeSaveModal} showForm={this.showForm} />
          ) : (
              <SaveConfirmationModal handleSubmit={this.handleSubmit} closeSaveModal={this.closeSaveModal} showForm={this.showForm} />
            )
          )
        }
      </>
    )
  }
}

export default Design;