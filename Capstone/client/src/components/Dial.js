import React from 'react';
function Dial(props) {
    const renderTicks = () => {
        let ticks = [];
        for (let i = 1; i <= 11; i++) {
            const tick = {
                tickStyle: {
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: "top"
                }
            };
            ticks.push(tick);
        }
        return ticks;
    };
    return (
        <div className={`dial-container ${props.uniqueClass}`}>
            {renderTicks().map((tick, i) => (
                <div className="tick"
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
export default Dial;