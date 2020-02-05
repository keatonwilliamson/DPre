import React from 'react';
function LabelGroup() {
    return (
        <>
        <p className="knob-label master-tune-label">TUNE</p>
        <p className="knob-label glide-knob-label">GLIDE</p>
        <p className="knob-label modulation-mix-label">MODULATION MIX</p>

        <p className="knob-label oscillator-modulation-label-oscillator">OSCILLATOR</p>
        <p className="knob-label oscillator-modulation-label-modulation">MODULATION</p>


        </>
    )
}
export default LabelGroup;