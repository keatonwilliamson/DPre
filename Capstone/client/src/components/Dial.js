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
            {props.zeroCentered ?
                (<>
                    <p style={{ top: 113, left: 12 }} className="dial-number-label">{-2 * props.multiplier}</p>
                    <p style={{ top: 37, left: 12 }} className="dial-number-label">{-1 * props.multiplier}</p>
                    <p style={{ top: 3, left: 81 }} className="dial-number-label">{-0 * props.multiplier}</p>
                    <p style={{ top: 37, left: 144 }} className="dial-number-label">{1 * props.multiplier}</p>
                    <p style={{ top: 113, left: 144 }} className="dial-number-label">{2 * props.multiplier}</p>
                </>
                ) : (<>
                    <p style={{ top: 137, left: 46 }} className="dial-number-label">{props.modulationMix ? "" : 0}</p>
                    <p style={{ top: 74, left: 10 }} className="dial-number-label">{2}</p>
                    <p style={{ top: 11, left: 46 }} className="dial-number-label">{4}</p>
                    <p style={{ top: 11, left: 117 }} className="dial-number-label">{6}</p>
                    <p style={{ top: 74, left: 153 }} className="dial-number-label">{8}</p>
                    <p style={{ top: 137, left: 116 }} className="dial-number-label">{props.modulationMix ? "" : 10}</p>
                </>
                )
            }
        </div>
    )
}
export default Dial;