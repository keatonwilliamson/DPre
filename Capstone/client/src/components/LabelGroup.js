import React from 'react';
function LabelGroup() {
    return (
        <>
        <p className="knob-label master-tune-label">TUNE</p>
        <p className="knob-label glide-knob-label">GLIDE</p>
        <p className="knob-label modulation-mix-label">MODULATION MIX</p>
        <p className="knob-label oscillator-modulation-label-oscillator">OSCILLATOR</p>
        <p className="knob-label oscillator-modulation-label-modulation">MODULATION</p>
        <p className="knob-label" style={{top: 16, left: 465}}>RANGE</p>
        <p className="knob-label" style={{top: 16, left: 771}}>WAVEFORM</p>
        <p className="knob-label" style={{top: 16, left: 963}}>VOLUME</p>
        <p className="knob-label" style={{top: 37, left: 605}}>FREQUENCY</p>
        <p className="knob-label" style={{top: 15, left: 581, fontSize: 18}}>OSCILLATOR—1</p>
        <p className="knob-label" style={{top: 200, left: 581, fontSize: 18}}>OSCILLATOR—2</p>
        <p className="knob-label" style={{top: 371, left: 581, fontSize: 18}}>OSCILLATOR—3</p>

        <p className="knob-label" style={{top: 88, left: 1288}}>EXTERNAL</p>
        <p className="knob-label" style={{top: 108, left: 1269}}>INPUT VOLUME</p>
        <p className="knob-label" style={{top: 284, left: 1266}}>NOISE VOLUME</p>

        <p className="knob-label" style={{top: 68, left: 1547}}>FILTER</p>
        <p className="knob-label" style={{top: 85, left: 1515}}>MODULATION</p>






        </>
    )
}
export default LabelGroup;