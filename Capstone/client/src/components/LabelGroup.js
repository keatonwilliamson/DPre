import React from 'react';
function LabelGroup() {
    return (
        <>
        <p className="knob-label master-tune-label">TUNE</p>
        <p className="knob-label glide-knob-label">GLIDE</p>
        <p className="knob-label modulation-mix-label">MODULATION MIX</p>

        <p className="modulation-mix-sub-label modulation-mix-knob-label-osc-3">OSC. 3/</p>
        <p className="modulation-mix-sub-label modulation-mix-knob-label-filter-eg">FILTER EG</p>
        <p className="modulation-mix-sub-label modulation-mix-knob-label-noise">NOISE /</p>
        <p className="modulation-mix-sub-label modulation-mix-knob-label-lfo">LFO</p>

        <p className="modulation-mix-sub-label oscillator-3-control-rocker-label">OSC. 3</p>
        <p className="modulation-mix-sub-label oscillator-3-control-rocker-label-control">CONTROL</p>

        <p className="knob-label oscillator-modulation-label-oscillator">OSCILLATOR</p>
        <p className="knob-label oscillator-modulation-label-modulation">MODULATION</p>


        </>
    )
}
export default LabelGroup;