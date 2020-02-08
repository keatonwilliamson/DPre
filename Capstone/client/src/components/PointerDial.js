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
                </>
                ) : (<>
                    <p style={{ top: 56, left: 3 }} className="pointer-dial-number-label">LO</p>
                    <p style={{ top: 21, left: 20 }} className="pointer-dial-number-label">32'</p>
                    <p style={{ top: 1, left: 59 }} className="pointer-dial-number-label">16'</p>
                    <p style={{ top: 1, left: 102 }} className="pointer-dial-number-label">8'</p>
                    <p style={{ top: 23, left: 135 }} className="pointer-dial-number-label">4'</p>
                    <p style={{ top: 57, left: 154 }} className="pointer-dial-number-label">2'</p>
                </>
                )
            }
        </div>
    )
}
export default PointerDial;