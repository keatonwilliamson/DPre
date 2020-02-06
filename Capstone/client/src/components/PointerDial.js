import React from 'react';
function PointerDial(props) {
    const renderTicks = () => {
        let ticks = [];
        for (let i = 0; i < 6; i++) {
            const tick = {
                tickStyle: {
                    transform: `rotate(${i * (i < 3 ? 30.4 : 30.8) + 104.5}deg)`,
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
            {props.waveforms ?
                (<>
                    <img className="triangle-wave-label" src={require('../Assets/waveforms/triangle.png')} alt="img" />
                    <img className="triangle-saw-wave-label" src={require('../Assets/waveforms/triangle-saw.png')} alt="img" />
                    <img className="saw-wave-label" src={require('../Assets/waveforms/saw.png')} alt="img" />
                    <img className="square-wave-label" src={require('../Assets/waveforms/square.png')} alt="img" />
                    <img className="pulse-wave-label" src={require('../Assets/waveforms/pulse.png')} alt="img" />
                    <img className="small-pulse-wave-label" src={require('../Assets/waveforms/small-pulse.png')} alt="img" />
                    {/* <p style={{ top: 113, left: 12 }} className="dial-number-label">{-2 * props.multiplier}</p>
                    <p style={{ top: 37, left: 12 }} className="dial-number-label">{-1 * props.multiplier}</p>
                    <p style={{ top: 3, left: 81 }} className="dial-number-label">{-0 * props.multiplier}</p>
                    <p style={{ top: 37, left: 144 }} className="dial-number-label">{1 * props.multiplier}</p>
                    <p style={{ top: 113, left: 144 }} className="dial-number-label">{2 * props.multiplier}</p> */}
                </>
                ) : (<>
                    <p style={{ top: 55, left: -1 }} className="pointer-dial-number-label">LO</p>
                    <p style={{ top: 16, left: 17 }} className="pointer-dial-number-label">32'</p>
                    <p style={{ top: -3, left: 58 }} className="pointer-dial-number-label">16'</p>
                    <p style={{ top: -3, left: 103 }} className="pointer-dial-number-label">8'</p>
                    <p style={{ top: 20, left: 140 }} className="pointer-dial-number-label">4'</p>
                    <p style={{ top: 57, left: 158 }} className="pointer-dial-number-label">2'</p>
                </>
                )
            }
        </div>
    )
}
export default PointerDial;