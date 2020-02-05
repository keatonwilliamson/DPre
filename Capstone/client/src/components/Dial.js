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
            { props.zeroCentered ?
                (<>
                <p style={{top: 113, left: 12 }} className="dial-number-label">{-2 * props.multiplier}</p>
                <p style={{top: 37, left: 12 }} className="dial-number-label">{-1 * props.multiplier}</p>
                <p style={{top: 3, left: 81 }} className="dial-number-label">{-0 * props.multiplier}</p>
                <p style={{top: 37, left: 144 }} className="dial-number-label">{1 * props.multiplier}</p>
                <p style={{top: 113, left: 144 }} className="dial-number-label">{2 * props.multiplier}</p>
                </>
                ) : (
                 <p>hey</p>   
                )
            }
        </div>
    )
}
export default Dial;