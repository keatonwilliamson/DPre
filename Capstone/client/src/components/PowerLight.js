import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'


function InputJack(props) {
    // const sidebar = useRef();
    useEffect(() => {
        console.log("useEffect LIGHT ran")

    }, [props.power]);

    return (<>
        <div style={{ position: 'absolute', top: 325, left: 2486 }} >
            <img style={{ position: 'absolute', height: 40 }} src={require('../Assets/metal-ring.png')} alt="img" />
            {/* <div style={{ position: 'absolute', backgroundColor: 'black', borderRadius: '50%', height: 45, width: 45, top: 11, left: 17  }}></div> */}

            <img style={{ visibility: (props.power ? 'visible' : 'hidden'), pointerEvents: 'none', position: 'absolute', height: 179, top: -70, left: -139, transform: 'rotate(-70deg)' }} src={require('../Assets/red-flare-transparent.png')} alt="img" />
            <img style={{ position: 'absolute', height: 41, top: 1, left: -9, filter: (props.power ? 'brightness(1.5)' : 'brightness(0.4)') }} src={require('../Assets/red-glass.png')} alt="img" />
        </div>
    </>
    )
}
export default InputJack