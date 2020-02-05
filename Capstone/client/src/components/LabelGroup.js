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

        <p className="modulation-mix-sub-label modulation-mix-rocker-label-osc-3">OSC. 3</p>
        <p className="modulation-mix-sub-label modulation-mix-rocker-label-filter-eg">FILTER EG</p>
        <p className="modulation-mix-sub-label modulation-mix-rocker-label-noise">NOISE</p>
        <p className="modulation-mix-sub-label modulation-mix-rocker-label-lfo">LFO</p>


        </>
    )
}
export default LabelGroup;