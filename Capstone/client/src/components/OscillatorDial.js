import React from 'react';
function OscillatorDial(props) {
    const renderTicks = () => {
        let ticks = [];
        for (let i = 1; i <= 17; i++) {
            const tick = {
                tickStyle: {
                    transform: `rotate(${i * 20}deg)`,
                    transformOrigin: "top",
                    height: `${(i === 9 ? 80 : 67)}px`
                }
            };
            ticks.push(tick);
        }
        return ticks;
    };
    return (
        <div className={`oscillator-dial-container ${props.uniqueClass}`}>
            {renderTicks().map((tick, i) => (
                <div className="oscillator-dial-tick"
                    key={i}
                    // className={
                    //     "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                    // }
                    style={tick.tickStyle}
                />
            ))
            }
        </div>
    )
}
export default OscillatorDial;