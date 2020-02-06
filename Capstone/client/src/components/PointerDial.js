import React from 'react';
function PointerDial(props) {
    const renderTicks = () => {
        let ticks = [];
        for (let i = 0; i < 6; i++) {
            const tick = {
                tickStyle: {
                    transform: `rotate(${i * (i < 3 ? 30.4 : 31) + 104.5}deg)`,
                    transformOrigin: "top"
                }
            };
            ticks.push(tick);
        }
        return ticks;
    };
    return (
        <div className={`pointer-dial-container ${props.uniqueClass}`}>
            {renderTicks().map((tick, i) => (
                <div className="pointer-dial-tick"
                    key={i}
                    // className={
                    //     "tick" + (tick.deg <= this.currentDeg ? " active" : "")
                    // }
                    style={tick.tickStyle}
                />
            ))
            }
            {/* {props.zeroCentered ?
                (<>
                    <p style={{ top: 113, left: 12 }} className="dial-number-label">{-2 * props.multiplier}</p>
                    <p style={{ top: 37, left: 12 }} className="dial-number-label">{-1 * props.multiplier}</p>
                    <p style={{ top: 3, left: 81 }} className="dial-number-label">{-0 * props.multiplier}</p>
                    <p style={{ top: 37, left: 144 }} className="dial-number-label">{1 * props.multiplier}</p>
                    <p style={{ top: 113, left: 144 }} className="dial-number-label">{2 * props.multiplier}</p>
                </>
                ) : (<>
                    <p style={{ top: 139, left: 44 }} className="dial-number-label">{props.modulationMix ? "" : 0}</p>
                    <p style={{ top: 74, left: 10 }} className="dial-number-label">{2}</p>
                    <p style={{ top: 9, left: 44 }} className="dial-number-label">{4}</p>
                    <p style={{ top: 9, left: 118 }} className="dial-number-label">{6}</p>
                    <p style={{ top: 74, left: 153 }} className="dial-number-label">{8}</p>
                    <p style={{ top: 139, left: 118 }} className="dial-number-label">{props.modulationMix ? "" : 10}</p>
                </>
                )
            } */}
        </div>
    )
}
export default PointerDial;