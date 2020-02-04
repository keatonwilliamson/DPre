import React from 'react';
function OnLabel(props) {
    return (
        <p className={`on-label ${props.uniqueClass}`} style={{ transform: `translate(${props.on ? 0 : -77}px, 0px)` }}>{props.on ? "ON" : "OFF"}</p>
    )
}
export default OnLabel;